import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontMono, fontMontserrat, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { EmptyHeader } from '@/components/empty-header'
import { TextHeader } from '@/components/text-header'
import { ImageHeader } from '@/components/image-header'
import { getCustomClientConfig } from '@/app/actions'

export const metadata: Metadata = {
  title: {
    default: 'Next.js AI Chatbot',
    template: `%s - Next.js AI Chatbot`
  },
  description: 'An AI-powered chatbot template built with Next.js and Vercel.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const clientId = 'corposerve'
  const config = await getCustomClientConfig(clientId)
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-montserrat antialiased',
          fontMontserrat.variable,
          fontMontserrat.variable
        )}
      >
        <Toaster />
        <Providers
          config={config}
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            <ImageHeader />
            <main className="flex flex-1 flex-col bg-background">
              {children}
            </main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
