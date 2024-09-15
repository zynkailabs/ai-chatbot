// LoadingChatMessage.tsx
import React from 'react'

export function LoadingChatMessage() {
  return (
    <div className="flex items-center justify-center space-x-2 mb-2 mt-2">
      <div
        className="w-1.5 h-1.5 rounded-full bg-gray-500"
        style={{
          animation: 'fade 1.2s infinite',
          animationDelay: '0ms'
        }}
      ></div>
      <div
        className="w-1.5 h-1.5 rounded-full bg-gray-500"
        style={{
          animation: 'fade 1.2s infinite',
          animationDelay: '200ms'
        }}
      ></div>
      <div
        className="w-1.5 h-1.5 rounded-full bg-gray-500"
        style={{
          animation: 'fade 1.2s infinite',
          animationDelay: '400ms'
        }}
      ></div>
      {/* Custom fade animation */}
      <style jsx>{`
        @keyframes fade {
          0%, 100% {
            background-color: #000000;
          }
          50% {
            background-color: #d1d5db; /* Tailwind's gray-300 */
          }
        }
      `}</style>
    </div>
  )
}
