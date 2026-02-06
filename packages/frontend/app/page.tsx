'use client'

import { TodoCard } from '@/components/TodoCard'
import { TodoForm } from '@/components/TodoForm'
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

  if (error)
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-2xl font-bold text-destructive">データの読み込みに失敗しました</p>
        <p className="mt-2 text-muted-foreground">しばらくしてから再度お試しください</p>
      </div>
    )

  if (data === undefined)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
        <Spinner className="size-16 text-purple-400" />
        <p className="text-muted-foreground text-sm animate-pulse">読み込み中...</p>
      </div>
    )

  return (
    <div className="max-w-6xl mx-auto px-4">
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-pink-500 to-purple-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md">
            新しいタスク
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-purple-200 to-transparent" />
        </div>
        <div className="flex justify-center">
          <TodoForm onPostItem={onPostItem} postIsMutating={postIsMutating} />
        </div>
      </section>

      <section>
        <div className="flex items-center gap-3 mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-linear-to-r from-cyan-500 to-blue-500 px-4 py-1.5 text-sm font-semibold text-white shadow-md">
            タスク一覧
          </span>
          <span className="text-xs text-muted-foreground font-medium bg-muted rounded-full px-2.5 py-0.5">
            {data.data.length} 件
          </span>
          <div className="flex-1 h-px bg-linear-to-r from-blue-200 to-transparent" />
        </div>

        {data.data.length === 0 && (
          <div className="text-center py-16">
            <p className="text-5xl mb-4">🎉</p>
            <p className="text-lg font-semibold text-muted-foreground">タスクはまだありません</p>
            <p className="text-sm text-muted-foreground mt-1">
              上のフォームから新しいタスクを追加してみましょう
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.data.map((item) => (
            <TodoCard
              key={item.id}
              todoItem={item}
              onPutItem={onPutItem}
              onDeleteItem={onDeleteItem}
              putIsMutating={putIsMutating}
              deleteIsMutating={deleteIsMutating}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
