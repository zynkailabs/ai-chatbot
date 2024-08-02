import { CustomClientConfig } from '@/lib/types'

export function generateStyles(config: CustomClientConfig): string {
  return `
    :root {
      --background: ${config.colors.primary};
      --header-background: ${config.colors.secondary};
      --text-primary: ${config.colors.textPrimary};
      --user-input-area: ${config.colors.secondary};
      --user-chat-bubble: ${config.colors.userChatBubble};
      --assistant-chat-bubble: ${config.colors.assistantChatBubble};
    }
  `
}
