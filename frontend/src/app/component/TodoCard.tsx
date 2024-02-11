'use client'
import { TodoItem } from '@prisma/client'
import { Button, Card, Form, Input, Switch, Typography } from 'antd'

export const TodoCard = (props: {
  todoItem: TodoItem
}) => {
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
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

  const onFinish = (item: string) => {
    console.log(item)
  }
  return (
    <>
      <Form
        {...layout}
        onFinish={onFinish}
        validateMessages={validateMessages}
        initialValues={{
          title: props.todoItem.title,
          comment: props.todoItem.comment,
          complete: props.todoItem.complete,
          id: props.todoItem.id,
        }}
      >
        <Card title={props.todoItem.title}>
          <Form.Item name="id" label="Id" rules={[]}>
            <Typography>{props.todoItem.id}</Typography>
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
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  )
}
