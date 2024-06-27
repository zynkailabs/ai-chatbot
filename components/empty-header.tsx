import * as React from 'react'

export async function EmptyHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between border-b px-4 backdrop-blur-xl bg-background dark:bg-background"
      style={{ filter: 'invert(1)' }}>
    </header>
  )
}
