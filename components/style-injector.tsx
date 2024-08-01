'use client'

import { useCustomClientConfig } from '@/components/custom-client-config-provider'
import { generateStyles } from '@/app/styles'

export function StyleInjector() {
  const config = useCustomClientConfig()
  const styles = generateStyles(config)

  return <style dangerouslySetInnerHTML={{ __html: styles }} />
}
