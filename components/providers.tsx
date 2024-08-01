'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'
import { CustomClientConfigProvider } from '@/components/custom-client-config-provider'
import { TooltipProvider } from '@/components/ui/tooltip'
import { CustomClientConfig } from '@/lib/types' // Make sure to import this

interface ProvidersProps extends ThemeProviderProps {
  config: CustomClientConfig
}

export function Providers({ children, config, ...props }: ProvidersProps) {
  return (
    <NextThemesProvider {...props}>
      <CustomClientConfigProvider config={config}>
        <TooltipProvider>{children}</TooltipProvider>
      </CustomClientConfigProvider>
    </NextThemesProvider>
  )
}
