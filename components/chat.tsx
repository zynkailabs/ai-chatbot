'use client'

import { Message, useAssistant as useAssistant } from '@ai-sdk/react'

import { cn } from '@/lib/utils'
import { ChatList } from '@/components/chat-list'
import { ChatPanel } from '@/components/chat-panel'
import { EmptyScreen } from '@/components/empty-screen'
import { ChatScrollAnchor } from '@/components/chat-scroll-anchor'
import { useLocalStorage } from '@/lib/hooks/use-local-storage'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { toast } from 'react-hot-toast'
import { LoadingChatMessage } from './ui/loading-chat-message'
import { ChatMessage } from '@/components/chat-message'

const IS_PREVIEW = process.env.VERCEL_ENV === 'preview'
export interface ChatProps extends React.ComponentProps<'div'> {
  initialMessages?: Message[]
  id?: string
  additionalData?: {
    userType?: string | null
    userID?: string | null
  }
}

export function Chat({
  id,
  initialMessages,
  className,
  additionalData
}: ChatProps) {
  const [previewToken, setPreviewToken] = useLocalStorage<string | null>(
    'ai-token',
    null
  )
  const [previewTokenDialog, setPreviewTokenDialog] = useState(IS_PREVIEW)
  const [previewTokenInput, setPreviewTokenInput] = useState(previewToken ?? '')
  const [showLoadingMessage, setShowLoadingMessage] = useState(false)

  const {
    messages,
    append,
    stop,
    status,
    input,
    setInput,
    submitMessage,
    handleInputChange,
    error
  } = useAssistant({ api: '/api/assistant' })

  const isLoading = status === 'in_progress'
  const latestMessage = messages[messages.length - 1]
  const loadingMessage: Message = {
    id: 'loading-message',
    role: 'assistant',
    content: '...'
  }

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (isLoading && latestMessage.role === 'user') {
      // Set timeout to show loading message after 500ms
      timeout = setTimeout(() => {
        setShowLoadingMessage(true)
      }, 500)
    } else {
      setShowLoadingMessage(false)
    }

    return () => clearTimeout(timeout)
  }, [isLoading, latestMessage])

  return (
    <>
      <div className={cn('pb-[200px] pt-4 md:pt-10', className)}>
        {messages.length ? (
          <>
            <ChatList messages={messages} />
            {showLoadingMessage ? (
              <div className="relative mx-auto max-w-2xl px-4">
                <ChatMessage message={loadingMessage} isLoadingChatMessage={true} />
              </div>
            ) : null}
            <ChatScrollAnchor trackVisibility={isLoading} />
          </>
        ) : (
          <EmptyScreen setInput={setInput} />
        )}
      </div>
      <ChatPanel
        id={id}
        isLoading={isLoading}
        stop={stop}
        append={append}
        messages={messages}
        input={input}
        setInput={setInput}
        additionalData={additionalData}
      />

      <Dialog open={previewTokenDialog} onOpenChange={setPreviewTokenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter your OpenAI Key</DialogTitle>
            <DialogDescription>
              If you have not obtained your OpenAI API key, you can do so by{' '}
              <a
                href="https://platform.openai.com/signup/"
                className="underline"
              >
                signing up
              </a>{' '}
              on the OpenAI website. This is only necessary for preview
              environments so that the open source community can test the app.
              The token will be saved to your browser&apos;s local storage under
              the name <code className="font-mono">ai-token</code>.
            </DialogDescription>
          </DialogHeader>
          <Input
            value={previewTokenInput}
            placeholder="OpenAI API key"
            onChange={e => setPreviewTokenInput(e.target.value)}
          />
          <DialogFooter className="items-center">
            <Button
              onClick={() => {
                setPreviewToken(previewTokenInput)
                setPreviewTokenDialog(false)
              }}
            >
              Save Token
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
