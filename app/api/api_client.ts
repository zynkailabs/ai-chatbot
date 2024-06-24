import { URL } from "url"

const AUTH_ENDPOINT =
  'https://login.microsoftonline.com/ccc52638-bd4d-4b2c-a4d3-f1dafee1500e/oauth2/v2.0/token'
const API_BASE_URL =
  `https://api.businesscentral.dynamics.com/v2.0/ccc52638-bd4d-4b2c-a4d3-f1dafee1500e/CSCM/ODataV4/Company('CRONUS%20IN')`

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

  async request(method: string, queryParams: Record<string, string> | string = {}, body = null): Promise<any> {
    const token = await this.getToken()
    let url = `${API_BASE_URL}`;

    if (typeof queryParams === 'string') {
      // If queryParams is a string, append it directly to the URL
      if (queryParams) {
        url += `${queryParams}`;
      }
    } else {
      // If queryParams is a Record, construct the query string
      const urlObject = new URL(url);
      Object.keys(queryParams).forEach(key => {
        urlObject.searchParams.append(key, queryParams[key]);
      });
      url = urlObject.toString();
    }

    console.log(`[CampusAssistant] Call CorpoServe API: ${url}`)

    try {
      const response = await fetch(url, {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      })

      if (!response.ok) {
        if (response.status === 401) {
          // Token might have expired, retry with a new token
          this.token = null
          return this.request(method, queryParams)
        }
        throw new Error(`[CampusAssistant] API call failed: ${response.status}. ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  async fetchData(queryParams: Record<string, string> | string = {}) {
    return this.request('GET', queryParams)
  }
}

export default APIClient;