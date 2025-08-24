'use client'
import { blue } from '@ant-design/colors'
import { Button, Card, Col, Form, Input, Row, Switch } from 'antd'
import { useEffect } from 'react'
import { useSWRConfig } from 'swr'
// import { TodoItem } from '@prisma/client'
import { TodoItem } from '../../../../types/src/TodoItem'
import { NotificationPlacementType, NotificationSeverityType } from '../page'

export const TodoCard = (props: {
  todoItem: TodoItem
  endpointUrl: string
  openNotification: (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    message: string,
  ) => void
}) => {
  const { mutate } = useSWRConfig()
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

  const onFinish = (item: TodoItem) => {
    fetch(props.endpointUrl, {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(() => {
        props.openNotification('bottomRight', 'success', 'Successful Update')
      })
      .catch((err) => {
        props.openNotification('bottomRight', 'error', err)
      })
      .finally(() => mutate(props.endpointUrl))
  }

  const deleteItem = () => {
    console.log(inputId)
    fetch(props.endpointUrl, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: inputId }),
    })
      .then(() => {
        props.openNotification('bottomRight', 'success', 'Successful Delete')
      })
      .catch((err) => {
        props.openNotification('bottomRight', 'error', err)
      })
      .finally(() => mutate(props.endpointUrl))
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
              <Button type="primary" danger onClick={() => deleteItem()}>
                Delete
              </Button>
            </Col>
          </Row>
        </Form.Item>
      </Card>
    </Form>
  )
}
