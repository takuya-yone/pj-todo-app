'use client'

import { red } from '@ant-design/colors'

import { Col, Divider, Row, Spin, Typography } from 'antd'
import { TodoCard } from './components/TodoCard'
import { TodoForm } from './components/TodoForm'
import { useTodo } from './hooks/useTodo'

export default function Home() {
  const {
    data,
    error,
    onPostItem,
    onPutItem,
    postIsMutating,
    putIsMutating,
    onDeleteItem,
    deleteIsMutating,
    contextHolder,
  } = useTodo()

  if (error) return <Typography>failed to load</Typography>
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
          <TodoForm onPostItem={onPostItem} postIsMutating={postIsMutating} />
        </Col>
      </Row>

      <Divider>List</Divider>
      <Row gutter={[32, 24]}>
        {data?.data.map((item) => (
          <Col span={8} key={item.id}>
            <TodoCard
              todoItem={item}
              onPutItem={onPutItem}
              onDeleteItem={onDeleteItem}
              putIsMutating={putIsMutating}
              deleteIsMutating={deleteIsMutating}
            />
          </Col>
        ))}
      </Row>
    </>
  )
}
