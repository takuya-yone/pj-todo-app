import { toast } from 'sonner'
import {
  useTodoControllerCreate,
  useTodoControllerDelete,
  useTodoControllerGet,
  useTodoControllerUpdate,
} from '@/gen/endpoints/todo/todo'
import { CreateTodoDto, DeleteTodoDto, UpdateTodoDto } from '@/gen/models'

export const useTodo = () => {
  const { data, error } = useTodoControllerGet()
  const { trigger: postTrigger, isMutating: postIsMutating } = useTodoControllerCreate()
  const { trigger: putTrigger, isMutating: putIsMutating } = useTodoControllerUpdate()
  const { trigger: deleteTrigger, isMutating: deleteIsMutating } = useTodoControllerDelete()

  const openSuccessToast = (message: string) => {
    toast.success(message, { style: { background: 'var(--color-green-600)', color: '#fff' } })
  }

  const openErrorToast = (message: string) => {
    toast.error(message, { style: { background: 'var(--color-red-400)', color: '#fff' } })
  }

  const onPostItem = async (item: CreateTodoDto): Promise<boolean> => {
    const res = await postTrigger(item)
    if (res.status === 201) {
      openSuccessToast('Successful Created')
      return true
    }
    openErrorToast(`Error: ${res.data}`)
    return false
  }

  const onPutItem = async (item: UpdateTodoDto): Promise<boolean> => {
    const res = await putTrigger(item)
    if (res.status === 200) {
      openSuccessToast('Successful Modified')
      return true
    }
    openErrorToast(`Error: ${res.data}`)
    return false
  }

  const onDeleteItem = async (item: DeleteTodoDto): Promise<boolean> => {
    const res = await deleteTrigger({ id: item.id })
    if (res.status === 200) {
      await openSuccessToast('Successful Deleted')
      return true
    }
    openErrorToast(`Error: ${res.data}`)
    return false
  }

  return {
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
