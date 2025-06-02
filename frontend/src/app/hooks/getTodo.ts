import { useEffect, useState } from 'react'
import { TodoItem } from '../../../../types/src/TodoItem'

export const getTodoHooks = () => {
  const [todo, setTodo] = useState<TodoItem[]>([])

  useEffect(() => {
    getTodo()
  }, [])

  const getTodo = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/todo')
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setTodo(data)
    } catch (error) {
      console.error('Error fetching todo:', error)
    }
  }

  const addTodo = async (newTodo: TodoItem) => {
    try {
      const response = await fetch('http://localhost:4000/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
      })
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      const data = await response.json()
      setTodo((prevTodos) => [...prevTodos, data])
    } catch (error) {
      console.error('Error adding todo:', error)
    }
  }

  return { todo, getTodo, addTodo }
}
