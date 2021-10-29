import {useEffect, useState} from 'react';
import {useFetching} from '../use-fetching';

export default function (noteID, request) {
  const [todo, updateTodo] = useState([]);
  const [fetchTodo, processing, error] = useFetching(request)

  async function fetch(noteID) {
    const todoData = await fetchTodo({ noteID });
    updateTodo(() => todoData);
  }

  useEffect(() => {
    fetch(noteID)
  }, [noteID]);

  const fetching = {
    fetch,
    processing,
    error
  }

  return [todo, fetching]
}
