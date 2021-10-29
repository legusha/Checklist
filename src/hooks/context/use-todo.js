import React, {useEffect, useState} from 'react'
import {useFetching} from '../use-fetching'

export default function useTodoList(request) {
  const [todo, setTodo] = useState([])
  const [fetchTodo, processing, error] = useFetching(request)

  const fetch = async () => {
    const listTodo = await fetchTodo()

    if (!error) {
      console.log(listTodo)
      setTodo(prevNote => listTodo)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const fetching = {
    fetch,
    processing,
    error
  }
  return [todo, fetching]
}
