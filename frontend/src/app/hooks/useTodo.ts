import type { NotificationArgsProps } from 'antd'
import { notification } from 'antd'
import {
  useTodoControllerDeleteTodo,
  useTodoControllerGetTodo,
  useTodoControllerPostTodo,
  useTodoControllerPutTodo,
} from '../apiClient'
export type NotificationPlacementType = NotificationArgsProps['placement']
export type NotificationSeverityType = 'success' | 'error' | 'info'

import { blue, green, red } from '@ant-design/colors'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from '../model'

export const useTodo = () => {
  const { data, error } = useTodoControllerGetTodo()
  const { trigger: postTrigger, isMutating: postIsMutating } = useTodoControllerPostTodo()
  const { trigger: putTrigger, isMutating: putIsMutating } = useTodoControllerPutTodo()
  const { trigger: deleteTrigger, isMutating: deleteIsMutating } = useTodoControllerDeleteTodo()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = (
    placement: NotificationPlacementType,
    type: NotificationSeverityType,
    title: string,
  ) => {
    if (type === 'success') {
      api.success({
        title: title,
        placement,
        style: { backgroundColor: green[0] },
      })
    }
    if (type === 'error') {
      api.error({
        title: title,
        placement,
        style: { backgroundColor: red[0] },
      })
    }
    if (type === 'info') {
      api.info({
        title: title,
        placement,
        style: { backgroundColor: blue[0] },
      })
    }
  }

  const onPostItem = async (item: CreateTodoDto): Promise<boolean> => {
    const res = await postTrigger(item)
    if (res.status === 201) {
      openNotification('bottomRight', 'success', 'Successful Create')
      return true
    }
    openNotification('bottomRight', 'error', `Error: ${res.data}`)
    return false
  }

  const onPutItem = async (item: UpdateTodoDto): Promise<boolean> => {
    const res = await putTrigger(item)
    if (res.status === 200) {
      openNotification('bottomRight', 'success', 'Successful Modify')
      return true
    }
    openNotification('bottomRight', 'error', `Error: ${res.data}`)
    return false
  }

  const onDeleteItem = async (item: DeleteTodoDto): Promise<boolean> => {
    const res = await deleteTrigger({ id: item.id })
    if (res.status === 200) {
      openNotification('bottomRight', 'success', 'Successful Delete')
      return true
    }
    openNotification('bottomRight', 'error', `Error: ${res.data}`)
    return false
  }

  return {
    contextHolder,
    openNotification,
    data,
    error,
    postTrigger,
    postIsMutating,
    onPostItem,
    putTrigger,
    putIsMutating,
    onPutItem,
    deleteTrigger,
    deleteIsMutating,
    onDeleteItem,
  }
}
