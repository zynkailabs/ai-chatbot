import { Message } from 'ai'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { cn } from '@/lib/utils'
import { CodeBlock } from '@/components/ui/codeblock'
import { MemoizedReactMarkdown } from '@/components/markdown'
import { IconAISparkles, IconCorpoGenie, IconUser } from '@/components/ui/icons'
import { ChatMessageActions } from '@/components/chat-message-actions'
import { useCustomClientConfig } from '@/components/custom-client-config-provider'

export interface ChatMessageProps {
  message: Message
  userBgColor?: string
  botBgColor?: string
  userTextColor?: string
  botTextColor?: string
}

export function ChatMessage({
  message,
  userBgColor = 'bg-userChatBubble',
  botBgColor = 'bg-assistantChatBubble',
  userTextColor = 'text-userChatBubbleText',
  botTextColor = 'text-assistantChatBubbleText',
  ...props
}: ChatMessageProps) {
  const isUser = message.role === 'user'
  const config = useCustomClientConfig()
  const userIcon = <IconUser />
  const assistantIcon =
    config.clientId === 'corposerve' ? <IconCorpoGenie /> : <IconAISparkles />

  return (
    <div
      className={cn(
        'group relative mb-4 flex items-start',
        isUser ? 'justify-end' : 'justify-start'
      )}
      {...props}
    >
      <div
        className={cn(
          'flex max-w-[90%] md:max-w-[80%] items-start',
          isUser ? 'flex-row-reverse' : 'flex-row'
        )}
      >
        <div
          className={cn(
            'flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full border shadow bg-white',
            isUser ? 'ml-2' : 'mr-2'
          )}
        >
          {isUser ? userIcon : assistantIcon}
        </div>
        <div
          className={cn(
            'rounded-lg px-4 py-2 shadow',
            isUser ? userBgColor : botBgColor
          )}
        >
          <MemoizedReactMarkdown
            className={cn(
              'prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0',
              isUser ? userTextColor : botTextColor
            )}
            remarkPlugins={[remarkGfm, remarkMath]}
            components={{
              p({ children }) {
                return <p className="mb-2 last:mb-0 text-inherit">{children}</p>
              },
              code({ node, inline, className, children, ...props }) {
                if (children.length) {
                  if (children[0] == '▍') {
                    return (
                      <span className="mt-1 animate-pulse cursor-default">
                        ▍
                      </span>
                    )
                  }
                  children[0] = (children[0] as string).replace('`▍`', '▍')
                }
                const match = /language-(\w+)/.exec(className || '')
                if (inline) {
                  return (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                }
                return (
                  <CodeBlock
                    key={Math.random()}
                    language={(match && match[1]) || ''}
                    value={String(children).replace(/\n$/, '')}
                    {...props}
                  />
                )
              }
            }}
          >
            {message.content}
          </MemoizedReactMarkdown>
        </div>
      </div>
      {/* <ChatMessageActions message={message} /> */}
    </div>
  )
}
