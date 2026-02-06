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
import { TodoControllerCreateBody as formSchema } from '@/gen/endpoints/todo/todo.zod'
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
    <Card className="rainbow-border p-6 w-full max-w-lg shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold">タイトル</FormLabel>
                <FormControl>
                  <Input
                    placeholder="やることを入力..."
                    className="focus:ring-2 focus:ring-purple-300 transition-shadow"
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
                <FormLabel className="font-semibold">コメント</FormLabel>
                <FormControl>
                  <Input
                    placeholder="メモを追加..."
                    className="focus:ring-2 focus:ring-purple-300 transition-shadow"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={props.postIsMutating}
              className="btn-gradient-primary rounded-full px-8 text-white font-semibold shadow-md"
            >
              追加する
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}
