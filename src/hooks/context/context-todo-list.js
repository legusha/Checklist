import React, {useState} from 'react'

export default function useTodoList() {
  const [todoList, setTodo] = useState([])
  return [todoList, setTodo]
}
