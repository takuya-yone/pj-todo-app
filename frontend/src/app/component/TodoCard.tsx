'use client'
import { blue } from '@ant-design/colors'
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd'
import { useEffect } from 'react'
import { useTodoControllerDeleteTodo, useTodoControllerPutTodo } from '../apiClient'
import { GetTodoDto } from '../model'
import { NotificationPlacementType, NotificationSeverityType } from '../page'

type TodoCardProps = {
  todoItem: GetTodoDto
  openNotification: (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => void
}

export const TodoCard = (props: TodoCardProps) => {
  const { trigger: updateTrigger } = useTodoControllerPutTodo()
  const { trigger: deleteTrigger } = useTodoControllerDeleteTodo()
  const [form] = Form.useForm()

  const inputId = Form.useWatch('id', form)

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

  const onFinish = async (item: GetTodoDto) => {
    const res = await updateTrigger(item)
    if (res.status === 200) {
      props.openNotification('bottomRight', 'success', 'Successful Modify')
      return
    }
    props.openNotification('bottomRight', 'error', `Error: ${res.data}`)
  }

  const deleteItem = async (id: string) => {
    const res = await deleteTrigger({ id: id })
    if (res.status === 200) {
      props.openNotification('bottomRight', 'success', 'Successful Delete')
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
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
            <Col span={8} className="gutter-row">
              <Button type="primary" danger onClick={() => deleteItem(inputId)}>
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Card>
    </Form>
  )
}
