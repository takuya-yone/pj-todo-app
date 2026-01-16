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
import { TodoControllerPostTodoBody as formSchema } from '@/gen/endpoints/todo/todo.zod'
import { CreateTodoDto } from '@/gen/models'

type TodoFormProps = {
  onPostItem: (item: CreateTodoDto) => Promise<boolean>
  postIsMutating: boolean
}

export const TodoForm = (props: TodoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      comment: '',
    },
  })

  const onSubmit = async (item: z.infer<typeof formSchema>) => {
    const success = await props.onPostItem(item)
    if (success) {
      form.reset()
    }
  }

  return (
    <Card className="p-4 w-96 shadow-none bg-stone-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
          <div className="flex justify-center">
            <Button type="submit" className="bg-blue-500 hover:bg-blue-700 w-24">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
