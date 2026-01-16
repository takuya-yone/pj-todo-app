'use client'

import { TodoCard } from '@/components/TodoCard'
import { TodoForm } from '@/components/TodoForm'
import { Separator } from '@/components/ui/separator'
import { Spinner } from '@/components/ui/spinner'
import { useTodo } from '@/hooks/useTodo'

export default function Home() {
  const {
    data,
    error,
    onPostItem,
    onPutItem,
    postIsMutating,
    putIsMutating,
    onDeleteItem,
    deleteIsMutating,
  } = useTodo()

  if (error) return <p>failed to load</p>
  if (data === undefined)
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Spinner className="size-80 text-gray-200" />
      </div>
    )
  return (
    <>
      <Separator className="my-8 flex justify-center">
        <p className="text-lg text-gray-500 font-semibold px-2 -my-4 bg-white">Create</p>
      </Separator>

      <div className="flex justify-center">
        <TodoForm onPostItem={onPostItem} postIsMutating={postIsMutating} />
      </div>

      <Separator className="my-8 flex justify-center">
        <p className="text-lg text-gray-500 font-semibold px-2 -my-4 bg-white">List</p>
      </Separator>

      <div className="grid grid-cols-3 justify-items-center">
        {data?.data.map((item) => (
          <div key={item.id} className="p-4 col-span-1 w-full max-w-md">
            <TodoCard
              todoItem={item}
              onPutItem={onPutItem}
              onDeleteItem={onDeleteItem}
              putIsMutating={putIsMutating}
              deleteIsMutating={deleteIsMutating}
            />
          </div>
        ))}
      </div>
    </>
  )
}
