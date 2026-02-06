'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { TodoControllerUpdateBody as formSchema } from '@/gen/endpoints/todo/todo.zod'
import { DeleteTodoDto, GetTodoDto, UpdateTodoDto } from '@/gen/models'
import { cn } from '@/lib/utils'

type TodoCardProps = {
  todoItem: GetTodoDto
  onPutItem: (item: UpdateTodoDto) => Promise<boolean>
  onDeleteItem: (item: DeleteTodoDto) => Promise<boolean>
  putIsMutating: boolean
  deleteIsMutating: boolean
}

export const TodoCard = (props: TodoCardProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: props.todoItem.id,
      title: props.todoItem.title,
      comment: props.todoItem.comment,
      complete: props.todoItem.complete,
    },
  })

  const isComplete = props.todoItem.complete

  return (
    <Card
      title={props.todoItem.id}
      className={cn(
        'card-hover overflow-hidden border-none shadow-md',
        isComplete
          ? 'bg-linear-to-br from-emerald-50 to-teal-100'
          : 'bg-linear-to-br from-amber-50 to-orange-100',
      )}
    >
      <div
        className={cn(
          'h-1.5 w-full',
          isComplete
            ? 'bg-linear-to-r from-emerald-400 to-teal-500'
            : 'bg-linear-to-r from-amber-400 to-orange-500',
        )}
      />
      <div className="p-5">
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              'text-xs font-semibold px-2.5 py-1 rounded-full',
              isComplete ? 'bg-emerald-200 text-emerald-700' : 'bg-amber-200 text-amber-700',
            )}
          >
            {isComplete ? '完了' : '進行中'}
          </span>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(props.onPutItem)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">タイトル</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="タイトル"
                      className="bg-white/70 focus:ring-2 focus:ring-purple-300 transition-shadow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-semibold text-sm">コメント</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="コメント"
                      className="bg-white/70 focus:ring-2 focus:ring-purple-300 transition-shadow"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="complete"
              render={({ field }) => (
                <FormItem className="flex items-center gap-3">
                  <FormLabel className="font-semibold text-sm mt-0">完了</FormLabel>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={props.putIsMutating}
                className="btn-gradient-primary flex-1 rounded-full text-white font-semibold shadow-md"
              >
                更新
              </Button>
              <Button
                type="button"
                onClick={() => props.onDeleteItem({ id: props.todoItem.id } as DeleteTodoDto)}
                disabled={props.deleteIsMutating}
                className="btn-gradient-danger flex-1 rounded-full text-white font-semibold shadow-md"
              >
                削除
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </Card>
  )
}
