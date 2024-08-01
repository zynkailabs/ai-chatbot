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
