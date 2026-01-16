'use client'
import { Form, Input } from 'antd'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { GetTodoDto } from '@/gen/models'
import { cn } from '@/lib/utils'

type TodoCardProps = {
  todoItem: GetTodoDto
  onPutItem: (item: GetTodoDto) => Promise<boolean>
  onDeleteItem: (item: GetTodoDto) => Promise<boolean>
  putIsMutating: boolean
  deleteIsMutating: boolean
}

export const TodoCard = (props: TodoCardProps) => {
  const [form] = Form.useForm()

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
      <Card
        title={props.todoItem.id}
        className={cn('p-4 max-w-md', props.todoItem.complete ? 'bg-green-100' : 'bg-blue-100')}
      >
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
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <div className="grid grid-cols-2 justify-items-center">
            <Button
              type="submit"
              disabled={props.putIsMutating}
              className="bg-blue-500 hover:bg-blue-700 w-24"
            >
              Submit
            </Button>
            <Button
              onClick={() => props.onDeleteItem(props.todoItem)}
              disabled={props.deleteIsMutating}
              className="bg-red-500 hover:bg-red-700 w-24"
            >
              Delete
            </Button>
          </div>
        </Form.Item>
      </Card>
    </Form>
  )
}
