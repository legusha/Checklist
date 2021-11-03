import {useEffect, useState} from 'react';
import {useFetching} from '../use-fetching';

export default function (noteID, request) {
  const [todo, updateTodo] = useState([]);
  const [fetchTodo, processing, error] = useFetching(request.get)
  const [fetchCreateTodo, processingCreateTodo, errorCreateTodo] = useFetching(request.post)
  const [fetchDeleteTodo, processingDeleteTodo, errorDeleteTodo] = useFetching(request.delete)

  async function fetch(noteID) {
    const todoData = await fetchTodo({ noteID });
    updateTodo(() => todoData);
  }

  async function createTodo(noteID, props) {
    const radix = 10
    const NewNoteID = parseInt(noteID, radix)
    const params = {
      body: {
        noteId: NewNoteID,
        complete: props.checkbox,
        title: props.input
      }
    }


    await fetchCreateTodo(params);
    await fetch(noteID)
    // updateTodo(() => todoData);
  }

  async function deleteTodo(params) {
    await fetchDeleteTodo(params);
    await fetch(noteID)
  }

  useEffect(() => {
    fetch(noteID)
  }, [noteID]);

  const fetching = {
    fetch,
    processing,
    error
  }

  const fetchingCreateTodo = {
    fetch: createTodo,
    processing: processingCreateTodo,
    error: errorCreateTodo,
  }

  const fetchingDeleteTodo = {
    fetch: deleteTodo,
    processing: processingDeleteTodo,
    error: errorDeleteTodo,
  }

  return [todo, fetching, fetchingCreateTodo, fetchingDeleteTodo]
}
