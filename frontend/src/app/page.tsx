'use client'

import { TodoItem } from '@prisma/client'
import { Button, Typography } from 'antd'
import useSWR from 'swr'

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<TodoItem[]>)
}

export default function Home() {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/todo`
  const { data: response, error } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true,
    // refreshInterval: 3,
  })
  return (
    <>
      <Button>dsfsafa</Button>
      <Typography>dsafafa</Typography>
    </>
  )
}
