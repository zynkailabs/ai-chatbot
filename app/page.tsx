import { nanoid } from '@/lib/utils'
import { Chat } from '@/components/chat'

export const runtime = 'edge'

const getQueryParamAsString = (param: string | string[] | undefined): string | null =>
  Array.isArray(param) ? param[0] : param ?? null;

export default function IndexPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const id = nanoid();

  const userType = getQueryParamAsString(searchParams['userType']);
  const userID = getQueryParamAsString(searchParams['userID']);

  return <Chat id={id} additionalData={{ userType, userID }} />;
}