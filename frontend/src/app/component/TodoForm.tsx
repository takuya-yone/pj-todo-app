'use client'
import { Button, Form, Input } from 'antd'
import { useTodoControllerPostTodo } from '../apiClient'
import { CreateTodoDto } from '../model'
import { NotificationPlacementType, NotificationSeverityType } from '../page'

type TodoFormProps = {
  openNotification: (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => void
}

export const TodoForm = (props: TodoFormProps) => {
  const { trigger, isMutating } = useTodoControllerPostTodo()
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

  const onFinish = async (item: CreateTodoDto) => {
    const res = await trigger(item)
    if (res.status === 201) {
      props.openNotification('bottomRight', 'success', 'Successful Create')
      return
    }
    props.openNotification('bottomRight', 'error', `Error: ${res.data}`)
  }

  return (
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
        <Button type="primary" htmlType="submit" disabled={isMutating}>
          Create
        </Button>
      </Form.Item>
    </Form>
  )
}
