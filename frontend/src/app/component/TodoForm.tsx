'use client'
import { TodoItem } from '@prisma/client'
import { Button, Form, Input } from 'antd'
import { useSWRConfig } from 'swr'
import { NotificationPlacementType, NotificationSeverityType } from '../page'

export const TodoForm = (props: {
  endpointUrl: string
  openNotification: (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => void
}) => {
  const { mutate } = useSWRConfig()
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

  const onFinish = (item: TodoItem) => {
    fetch(props.endpointUrl, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        props.openNotification('bottomRight', 'success', 'Successful Create')
      })
      .catch((err) => {
        props.openNotification('bottomRight', 'error', err)
      })
      .finally(() => mutate(props.endpointUrl))
  }

  return (
    <>
      <Form
        {...layout}
        form={form}
        onFinish={onFinish}
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
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
