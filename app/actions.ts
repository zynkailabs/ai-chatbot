'use server'
import 'server-only'
import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { Database } from '@/lib/db_types'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { type Chat, type CustomClientConfig } from '@/lib/types'

export async function getChats(userId?: string | null) {
  if (!userId) {
    return []
  }
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    const { data } = await supabase
      .from('chats')
      .select('payload')
      .order('payload->createdAt', { ascending: false })
      .eq('user_id', userId)
      .throwOnError()

    return (data?.map(entry => entry.payload) as Chat[]) ?? []
  } catch (error) {
    return []
  }
}

export async function getChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .maybeSingle()

  return (data?.payload as Chat) ?? null
}

export async function removeChat({ id, path }: { id: string; path: string }) {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    await supabase.from('chats').delete().eq('id', id).throwOnError()

    revalidatePath('/')
    return revalidatePath(path)
  } catch (error) {
    return {
      error: 'Unauthorized'
    }
  }
}

export async function clearChats() {
  try {
    const cookieStore = cookies()
    const supabase = createServerActionClient<Database>({
      cookies: () => cookieStore
    })
    await supabase.from('chats').delete().throwOnError()
    revalidatePath('/')
    return redirect('/')
  } catch (error) {
    console.log('clear chats error', error)
    return {
      error: 'Unauthorized'
    }
  }
}

export async function getSharedChat(id: string) {
  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  const { data } = await supabase
    .from('chats')
    .select('payload')
    .eq('id', id)
    .not('payload->sharePath', 'is', null)
    .maybeSingle()

  return (data?.payload as Chat) ?? null
}

export async function shareChat(chat: Chat) {
  const payload = {
    ...chat,
    sharePath: `/share/${chat.id}`
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient<Database>({
    cookies: () => cookieStore
  })
  await supabase
    .from('chats')
    .update({ payload: payload as any })
    .eq('id', chat.id)
    .throwOnError()

  return payload
}

export async function getCustomClientConfig(
  clientId: string
): Promise<CustomClientConfig> {
  // // Fetch configuration from your API route
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_URL}/api/config?clientId=${clientId}`
  // )
  // if (!response.ok) {
  //   throw new Error('Failed to fetch client config')
  // }
  // return response.json()
  switch (clientId) {
    case 'aman-ritiz':
      return {
        clientId: 'default',
        colors: {
          primary: '0 0% 100%',
          secondary: '216, 100%, 50%',
          textPrimary: '0 0% 100%',
          userChatBubble: '216, 100%, 50%',
          assistantChatBubble: '205.1 54.5% 80.2%'
        }
      }
    default:
      return {
        clientId: 'corposerve',
        colors: {
          primary: '199.1 38.8% 42.9%',
          secondary: '205.1 54.5% 80.2%',
          textPrimary: '240 5.9% 10%',
          userChatBubble: '205.1 54.5% 80.2%',
          assistantChatBubble: '205.1 54.5% 80.2%'
        }
      }
  }
}
