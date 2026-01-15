'use client'
import { Button, Form, Input } from 'antd'
import { CreateTodoDto } from '../model'

type TodoFormProps = {
  onPostItem: (item: CreateTodoDto) => Promise<void>
  postIsMutating: boolean
}

export const TodoForm = (props: TodoFormProps) => {
  const [form] = Form.useForm()
  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
    style: {
      minWidth: 1000,
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
      onFinish={props.onPostItem}
      validateMessages={validateMessages}
      style={{ margin: '10px' }}
    >
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

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit" disabled={props.postIsMutating}>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}
