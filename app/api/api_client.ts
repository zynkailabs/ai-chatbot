import { URL } from 'url'

const AUTH_ENDPOINT =
  'https://login.microsoftonline.com/ccc52638-bd4d-4b2c-a4d3-f1dafee1500e/oauth2/v2.0/token'

const SQL_TOKEN = 'A97F2D14-4A69-4498-B1F0-CB3334A0C32F'

const API_BASE_URL = {
   OData: `https://api.businesscentral.dynamics.com/v2.0/ccc52638-bd4d-4b2c-a4d3-f1dafee1500e/CSCM/ODataV4/Company('CRONUS%20IN')`,
  SQL: `http://mearestapi.corporateserve.com/api/SQLQuery`
}
  
type QueryType = 'OData' | 'SQL'

class UrlBuilder {
  private url: URL
  private customPath: string[]
  private customSearchParams: URLSearchParams

  constructor(baseUrl: string) {
    this.url = new URL(baseUrl)
    this.customPath = this.url.pathname.split('/').filter(Boolean)
    this.customSearchParams = new URLSearchParams(this.url.search)
  }

  addPath(...segments: string[]) {
    this.customPath = this.customPath.concat(
      segments.flatMap(segment => segment.split('/').filter(Boolean))
    )
    return this
  }

  addSearchParams(params: Record<string, string>): this {
    for (const [key, value] of Object.entries(params)) {
      this.customSearchParams.append(key, value)
    }
    return this
  }

  toString(): string {
    const fullPath = '/' + this.customPath.join('/')
    const searchString = this.customSearchParams.toString()
    const searchPart = searchString ? `?${searchString}` : ''
    return this.url.origin + fullPath + searchPart
  }
}

class APIClient {
  clientId: string
  clientSecret: string
  scope: string
  token: string | null
  tokenExpiry: number | null

  constructor(clientId: string, clientSecret: string, scope: string) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this.scope = scope
    this.token = null
    this.tokenExpiry = null
  }

  async getToken() {
    if (this.token && this.tokenExpiry && this.tokenExpiry > Date.now()) {
      return this.token
    }

    const params = new URLSearchParams({
      client_id: this.clientId,
      scope: this.scope,
      client_secret: this.clientSecret,
      grant_type: 'client_credentials'
    })

    console.log('[Campus Assistant] Auth token refresh required')
    const response = await fetch(AUTH_ENDPOINT, {
      method: 'POST',
      body: params,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    this.token = data.access_token
    this.tokenExpiry = Date.now() + data.expires_in * 1000
    return this.token
  }

  getURL(
    queryParams: Record<string, string> | string | null,
    queryType: QueryType
  ) {
    let url = API_BASE_URL[queryType]
    if (typeof queryParams === 'string') {
      // If queryParams is a string, append it directly to the URL
      if (queryParams) {
        const urlBuilder = new UrlBuilder(url)
        url = urlBuilder.addPath(queryParams).toString()
      }
    } else if (typeof queryParams === 'object' && queryParams !== null) {
      // If queryParams is a Record, construct the query string
      const urlBuilder = new UrlBuilder(url)
      urlBuilder.addSearchParams(queryParams)
      url = urlBuilder.toString()
    }
    return url
  }

  getHeaders(token: string | null, queryType: QueryType): HeadersInit {
    let headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    if (queryType === 'OData') {
      headers['Authorization'] = `Bearer ${token}`
    }
    return headers
  }

  async request(
    method: string,
    queryParams: Record<string, string> | string | null = {},
    queryType: QueryType,
    body: string | null
  ): Promise<any> {

    let url = this.getURL(queryParams, queryType)
    const token = await this.getToken()
    let header = this.getHeaders(token, queryType)
    console.log(`[CampusAssistant] Call CorpoServe API: ${url}`)

    try {
      const request = {
        method,
        body: body ? body : null,
        headers: header
      }
      console.log(
        `[CampusAssistant] Call CorpoServe API: Request ${JSON.stringify(request)}`
      )
      const response = await fetch(url, request)

      if (!response.ok) {
        if (response.status === 401) {
          // Token might have expired, retry with a new token
          this.token = null
          return this.request(method, queryParams, queryType, body)
        }
        throw new Error(
          `[CampusAssistant] API call failed: ${response.status}. ${response.statusText}`
        )
      }

      return response.json()
      
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async fetchData(
    queryParams: Record<string, string> | string | null = {},
    queryType: QueryType
  ) {
    return this.request('GET', queryParams, (queryType = 'OData'), null)
  }

  async fetchSQLData(
    queryParams: Record<string, string> | string | null = {},
    queryType: QueryType
  ) {
    let body = JSON.stringify({
      query: queryParams,
      token: SQL_TOKEN
    })
    queryParams = null
    return this.request('GET', queryParams, (queryType = 'SQL'), body)
  }

}

export default APIClient
