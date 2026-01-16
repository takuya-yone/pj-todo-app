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
import { TodoControllerPutTodoBody as formSchema } from '@/gen/endpoints/todo/todo.zod'
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

  return (
    <Card
      title={props.todoItem.id}
      className={cn('p-4', props.todoItem.complete ? 'bg-green-100' : 'bg-blue-100')}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(props.onPutItem)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
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
                <FormLabel>Comment</FormLabel>
                <FormControl>
                  <Input placeholder="comment" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="complete"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Complete</FormLabel>
                <FormControl>
                  <Switch checked={field.value} onCheckedChange={field.onChange}></Switch>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 justify-items-center">
            <Button
              type="submit"
              disabled={props.putIsMutating}
              className="bg-blue-500 hover:bg-blue-700 w-24"
            >
              Submit
            </Button>
            <Button
              onClick={() => props.onDeleteItem({ id: props.todoItem.id } as DeleteTodoDto)}
              disabled={props.deleteIsMutating}
              className="bg-red-500 hover:bg-red-700 w-24"
            >
              Delete
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
