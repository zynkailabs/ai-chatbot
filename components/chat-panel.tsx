import { type UseAssistantHelpers } from '@ai-sdk/react'

import { Button } from '@/components/ui/button'
import { PromptForm } from '@/components/prompt-form'
import { ButtonScrollToBottom } from '@/components/button-scroll-to-bottom'
import { IconRefresh, IconStop } from '@/components/ui/icons'
import { FooterText } from '@/components/footer'

export interface ChatPanelProps
  extends Pick<
    UseAssistantHelpers,
    | 'append'
    // | 'reload'
    | 'messages'
    | 'stop'
    | 'input'
    | 'setInput'
  > {
  id?: string
  isLoading: boolean
  additionalData?: Record<any, any>
}

export function ChatPanel({
  id,
  stop,
  append,
  isLoading,
  input,
  setInput,
  messages,
  additionalData
}: ChatPanelProps) {
  const userType = additionalData?.userType
  const userID = additionalData?.userID
  return (
    <div className="fixed inset-x-0 bottom-0 bg-corpoBackground">
      {/* <ButtonScrollToBottom /> */}
      <div className="mx-auto sm:max-w-2xl sm:px-4">
        {/* <div className="flex h-10 items-center justify-center">
          {isLoading && (
            <Button
              variant="outline"
              onClick={() => stop()}
              className="bg-background"
            >
              <IconStop className="mr-2" />
              Interrupt
            </Button>
          )}
        </div> */}
        <div className="space-y-4 border-t bg-userInputArea px-4 py-2 shadow-lg sm:rounded-t-xl sm:border md:py-4">
          <PromptForm
            onSubmit={async value => {
              await append(
                {
                  id,
                  content: value,
                  role: 'user'
                },
                { data: { userType: userType, userID: userID } }
              )
            }}
            input={input}
            setInput={setInput}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}
