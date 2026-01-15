'use client'
import { blue } from '@ant-design/colors'
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd'
import { useEffect } from 'react'
import { GetTodoDto } from '../model'

type TodoCardProps = {
  todoItem: GetTodoDto
  onPutItem: (item: GetTodoDto) => Promise<void>
  onDeleteItem: (item: GetTodoDto) => Promise<void>
  putIsMutating: boolean
  deleteIsMutating: boolean
}

export const TodoCard = (props: TodoCardProps) => {
  const [form] = Form.useForm()

  const _inputId = Form.useWatch('id', form)

  useEffect(() => form.resetFields(), [props.todoItem])

  const layout = {
    labelCol: {
      span: 10,
    },
    wrapperCol: {
      span: 10,
    },
    style: {
      maxWidth: 800,
    },
  }
  const validateMessages = {
    required: '${label}は必須です。',
    types: {
      email: '${label}!を正しい形式で入力してください。',
    },
    number: {
      range: '${label}は${min}から${max}の間で入力してください。',
    },
  }

  return (
    <Form
      {...layout}
      form={form}
      onFinish={props.onPutItem}
      validateMessages={validateMessages}
      initialValues={{
        title: props.todoItem.title,
        comment: props.todoItem.comment,
        complete: props.todoItem.complete,
        id: props.todoItem.id,
      }}
    >
      <Card title={props.todoItem.id} style={{ backgroundColor: blue[0] }}>
        <Form.Item
          name="id"
          label="Id"
          rules={[
            {
              required: true,
            },
          ]}
          style={{ display: 'none' }}
        >
          <Input disabled={true} />
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="complete"
          label="Complete"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Switch />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Row>
            <Col span={8} className="gutter-row">
              <Button type="primary" htmlType="submit" disabled={props.putIsMutating}>
                Submit
              </Button>
            </Col>
            <Col span={8} className="gutter-row">
              <Button
                type="primary"
                danger
                onClick={() => props.onDeleteItem(props.todoItem)}
                disabled={props.deleteIsMutating}
              >
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Card>
    </Form>
  )
}
