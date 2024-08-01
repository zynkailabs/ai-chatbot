'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { CustomClientConfig } from '../lib/types'

const CustomClientConfigContext = createContext<CustomClientConfig | null>(null)

export function CustomClientConfigProvider({
  children,
  config
}: {
  children: ReactNode
  config: CustomClientConfig
}) {
  React.useEffect(() => {
    console.log(`Updating colors with config: ${JSON.stringify(config)}`)
    // Apply any global configurations here
    document.documentElement.style.setProperty(
      '--background',
      config.colors.background
    )
  }, [config])

  return (
    <CustomClientConfigContext.Provider value={config}>
      {children}
    </CustomClientConfigContext.Provider>
  )
}

export const useCustomClientConfig = () => {
  const context = useContext(CustomClientConfigContext)
  if (context === null) {
    throw new Error(
      'useCustomClientConfig must be used within a CustomClientConfigProvider'
    )
  }
  return context
}
