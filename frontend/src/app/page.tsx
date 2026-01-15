'use client'

import { blue, green, red } from '@ant-design/colors'

import type { NotificationArgsProps } from 'antd'
import { Col, Divider, notification, Row, Spin, Typography } from 'antd'
import { useTodoControllerGetTodo } from './apiClient'
import { TodoCard } from './component/TodoCard'
import { TodoForm } from './component/TodoForm'

export type NotificationPlacementType = NotificationArgsProps['placement']
export type NotificationSeverityType = 'success' | 'error' | 'info'

export default function Home() {
  const { data, error } = useTodoControllerGetTodo()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => {
    if (type === 'success') {
      api.success({
        title: message,
        placement,
        style: { backgroundColor: green[0] },
      })
    }
    if (type === 'error') {
      api.error({
        title: message,
        placement,
        style: { backgroundColor: red[0] },
      })
    }
    if (type === 'info') {
      api.info({
        title: message,
        placement,
        style: { backgroundColor: blue[0] },
      })
    }
  }

  if (error) return <Typography>failed to load</Typography>
  // if (isLoading) return <Typography>loading...</Typography>
  if (data === undefined)
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
          <TodoForm openNotification={openNotification} />
        </Col>
      </Row>

      <Divider>List</Divider>
      <Row gutter={[32, 24]}>
        {data?.data.map((item) => (
          <Col span={8} key={item.id}>
            <TodoCard todoItem={item} openNotification={openNotification} />
          </Col>
        ))}
      </Row>
    </>
  )
}
