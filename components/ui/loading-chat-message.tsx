import React from 'react'

export function LoadingChatMessage() {
  return (
    <div className="flex items-center justify-center space-x-2">
      <div
        className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"
        style={{ animationDelay: '0ms' }}
      ></div>
      <div
        className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"
        style={{ animationDelay: '200ms' }}
      ></div>
      <div
        className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"
        style={{ animationDelay: '400ms' }}
      ></div>
    </div>
  )
}
