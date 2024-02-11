'use client'
import { blue } from '@ant-design/colors'
import { TodoItem } from '@prisma/client'
import { Button, Card, Form, Input, Switch, Typography } from 'antd'
import { useSWRConfig } from 'swr'

export const TodoCard = (props: {
  todoItem: TodoItem
  endpointUrl: string
}) => {
  const { mutate } = useSWRConfig()
  const [form] = Form.useForm()
  const inputId = Form.useWatch('id', form)
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
      .then((res) => {
        console.log(res)
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
      .then((res) => {
        console.log(res)
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
        initialValues={{
          title: props.todoItem.title,
          comment: props.todoItem.comment,
          complete: props.todoItem.complete,
          id: props.todoItem.id,
        }}
      >
        <Card title={props.todoItem.title} style={{ backgroundColor: blue[1] }}>
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
            <Button type="primary" danger onClick={() => deleteItem()}>
              Delete
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  )
}
