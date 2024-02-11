import { TodoItem } from '@prisma/client'

export const TodoCard = (props: {
  todoItem: TodoItem
}) => {
  return (
    <>
      <p>{props.todoItem.createdAt.toString()}</p>
    </>
  )
}
