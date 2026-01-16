'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { CreateTodoDto } from '@/gen/models'

type TodoFormProps = {
  onPostItem: (item: CreateTodoDto) => Promise<boolean>
  postIsMutating: boolean
}

const formSchema = z.object({
  title: z.string().min(1, {
    message: 'title must be at least 1 characters.',
  }),
  comment: z.string().min(1, {
    message: 'comment must be at least 1 characters.',
  }),
})

export const TodoForm = (props: TodoFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      comment: '',
    },
  })
  const _validateMessages = {
    required: '${label}は必須です。',
    types: {
      email: '${label}!を正しい形式で入力してください。',
    },
    number: {
      range: '${label}は${min}から${max}の間で入力してください。',
    },
  }

  const _onSubmit = async (item: CreateTodoDto) => {
    const success = await props.onPostItem(item)
    if (success) {
      // form.resetFields()
    }
  }

  const onSubmit2 = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit2)} className="space-y-8">
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}
