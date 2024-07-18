import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

export interface IndexPageProps {
  params: {
    userType: string,
    userID: string
  }
}

export default function IndexPage({ params }: IndexPageProps) {
  const id = nanoid()
  const userType = params.userType
  const userID = params.userID

  return <Chat id={id} additionalData={{userType: userType, userID: userID}} />
}
