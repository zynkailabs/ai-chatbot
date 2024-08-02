import { UseChatHelpers } from 'ai/react'

import { Button } from '@/components/ui/button'
import { ExternalLink } from '@/components/external-link'
import { IconArrowRight } from '@/components/ui/icons'

const exampleMessages = [
  {
    heading: 'The green card process',
    message: `How does the green card process work?`
  },
  {
    heading: 'Traveling with a pending H1B application',
    message: `Can I travel internationally while on an H1B visa?`
  },
  {
    heading: 'Switching employers on an H1B visa',
    message: `Can I switch employers while on an H1B visa?`
  }
]

export function EmptyScreen({ setInput }: Pick<UseChatHelpers, 'setInput'>) {
  return (
    <div className="mx-auto max-w-2xl px-4">
      <div className="rounded-lg border bg-headerBackground p-8">
        <h1 className="mb-2 text-lg font-semibold text-textPrimary">
          👋 Hello there!
        </h1>
        {/* <p className="mb-2 leading-normal text-muted-foreground">
          This is an open source AI chatbot app template built with{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink> and{' '}
          <ExternalLink href="https://supabase.com">Supabase</ExternalLink>.
        </p> */}
        <p className="leading-normal text-textPrimary/80">
          I&apos;m your campus assistant. How can I help?
        </p>
        {/* <div className="mt-4 flex flex-col items-start space-y-2">
          {exampleMessages.map((message, index) => (
            <Button
              key={index}
              variant="link"
              className="h-auto p-0 text-base"
              onClick={() => setInput(message.message)}
            >
              <IconArrowRight className="mr-2 text-muted-foreground" />
              {message.heading}
            </Button>
          ))}
        </div> */}
      </div>
    </div>
  )
}
