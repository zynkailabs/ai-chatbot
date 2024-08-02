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
import { generateStyles } from '@/app/styles'

interface RootLayoutProps {
  children: React.ReactNode
  params: { clientId: string }
}

const getFontForConfig = (config: any) => {
  switch (config.clientId) {
    case 'corposerve':
      return cn(
        'font-montserrat antialiased',
        fontMontserrat.variable,
        fontMontserrat.variable
      )
    case 'aman-ritiz':
      return cn('font-sans antialiased', fontSans.variable, fontSans.variable)
    default:
      return cn('font-sans antialiased', fontSans.variable, fontSans.variable)
  }
}

export default async function ChatLayout({
  children,
  params
}: RootLayoutProps) {
  const config = await getCustomClientConfig(params.clientId)
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={getFontForConfig(config)}>
        <Toaster />
        <Providers
          config={config}
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="flex min-h-screen flex-col">
            {/* @ts-ignore */}
            {config.clientId === 'corposerve' ? (
              <ImageHeader />
            ) : (
              <EmptyHeader />
            )}
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
