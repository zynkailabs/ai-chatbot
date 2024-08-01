import { CustomClientConfig } from '@/lib/types'

export function generateStyles(config: CustomClientConfig): string {
  return `
    :root {
      --background: ${config.colors.background};
    }
  `
}
