'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { CustomClientConfigProvider } from '@/components/custom-client-config-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CustomClientConfig } from '@/lib/types'
import { StyleInjector } from '@/components/style-injector'

interface ProvidersProps extends ThemeProviderProps {
  config: CustomClientConfig
}

export function Providers({ children, config, ...props }: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      <CustomClientConfigProvider config={config}>
        <StyleInjector />
        <TooltipProvider>{children}</TooltipProvider>
      </CustomClientConfigProvider>
    </NextThemesProvider>
  )
}
