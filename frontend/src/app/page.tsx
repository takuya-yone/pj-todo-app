'use client'

import { red } from '@ant-design/colors'
import { TodoItem } from '@prisma/client'
import { Col, Divider, Row, Spin, Typography } from 'antd'
import useSWR from 'swr'
import { TodoCard } from './component/TodoCard'
import { TodoForm } from './component/TodoForm'

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
  if (response === undefined)
    return (
      <Spin tip="Loading" size="large">
        <div />
      </Spin>
    )
  return (
    <>
      <Divider>Create</Divider>

      <Row gutter={[32, 24]} justify="center">
        <Col span={8} style={{ backgroundColor: red[1], margin: '10px' }}>
          <TodoForm endpointUrl={apiEndpoint} />
        </Col>
      </Row>

      <Divider>List</Divider>
      <Row gutter={[32, 24]}>
        {response.map((item) => (
          <Col span={8} className="gutter-row" key={item.id}>
            <TodoCard todoItem={item} endpointUrl={apiEndpoint} />
          </Col>
        ))}
      </Row>
    </>
  )
}
