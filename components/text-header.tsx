import * as React from 'react'

export async function TextHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-center backdrop-blur-xl bg-corpoHeaderBackground">
      <h1
        style={{
          color: 'white',
          fontSize: '1.125rem',
          fontWeight: 'bold'
        }}
      >
        CS Campus Genie
      </h1>
    </header>
  )
}
