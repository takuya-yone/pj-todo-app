'use client'

import { blue, green, red } from '@ant-design/colors'
import type { TodoItem } from '@prisma/client'
import { Col, Divider, Row, Spin, Typography, notification } from 'antd'
import type { NotificationArgsProps } from 'antd'
import useSWR from 'swr'
import { TodoCard } from './component/TodoCard'
import { TodoForm } from './component/TodoForm'

export type NotificationPlacementType = NotificationArgsProps['placement']
export type NotificationSeverityType = 'success' | 'error' | 'info'

async function fetcher(key: string, init?: RequestInit) {
  return fetch(key, init).then((res) => res.json() as Promise<TodoItem[]>)
}

export default function Home() {
  const apiEndpoint = `${process.env.NEXT_PUBLIC_API_ENDPOINT}/todo`
  const { data: response, error } = useSWR(apiEndpoint, fetcher, {
    revalidateOnFocus: true,
    // refreshInterval: 3,
  })

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => {
    if (type === 'success') {
      api.success({
        message: message,
        placement,
        style: { backgroundColor: green[0] },
      })
    }
    if (type === 'error') {
      api.error({
        message: message,
        placement,
        style: { backgroundColor: red[0] },
      })
    }
    if (type === 'info') {
      api.info({
        message: message,
        placement,
        style: { backgroundColor: blue[0] },
      })
    }
  }

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
      {contextHolder}
      <Divider>Create</Divider>

      <Row gutter={[32, 24]} justify="center">
        <Col span={8} style={{ backgroundColor: red[0], margin: '10px' }}>
          <TodoForm endpointUrl={apiEndpoint} openNotification={openNotification} />
        </Col>
      </Row>

      <Divider>List</Divider>
      <Row gutter={[32, 24]}>
        {response.map((item) => (
          <Col span={8} className="gutter-row" key={item.id}>
            <TodoCard
              todoItem={item}
              endpointUrl={apiEndpoint}
              openNotification={openNotification}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
