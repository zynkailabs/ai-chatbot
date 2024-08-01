import { type Message } from 'ai'

// TODO refactor and remove unneccessary duplicate data.
export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string // Refactor to use RLS
}

export const VALID_CORPORATE_SERVE_USER_TYPES = ['student', 'teacher', 'admin']
export type CorporateServeUserType = 'student' | 'teacher' | 'admin'

export type ServerActionResult<Result> = Promise<
  | Result
  | {
      error: string
    }
>

export interface CustomClientConfig {
  clientId: string
  colors: {
    background: string
    // text: string
    // accent: string
  }
  // icons: {
  //   logo: string
  //   // Add more icon keys as needed
  // }
}
