'use client'

import { TodoItem } from '@prisma/client'
import { Button, Typography } from 'antd'
import useSWR from 'swr'
import { TodoCard } from './component/TodoCard'

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<TodoItem[]>)
}

export default function Home() {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/todo`
  const { data: response, error } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true,
    // refreshInterval: 3,
  })

  if (error) return <Typography>failed to load</Typography>
  // if (isLoading) return <Typography>loading...</Typography>
  if (response === undefined) return <Typography>loading....</Typography>
  return <Typography>{response?.toString()}</Typography>

  // return (
  //   <>
  //     <Button>dsfsafa</Button>
  //     <Typography>dsafafa</Typography>
  //   </>
  // )
}
