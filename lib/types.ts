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
    primary: string // background 
    secondary: string // header and input text area
    textPrimary: string // chat bubble text 
    userChatBubble: string // user chat bubble background
    assistantChatBubble: string // assistant chat bubble background
  }
  // icons: {
  //   logo: string
  //   // Add more icon keys as needed
  // }
}
