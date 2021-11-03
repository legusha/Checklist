import React, {useEffect, useState} from 'react'

import { useFetching } from '../use-fetching';

export default function useNote(request) {
  const [note, setNote] = useState([])
  const [fetchNote, processing, error] = useFetching(request)

  const fetch = async () => {
    const listNote = await fetchNote()

    if (!error) {
      setNote(prevNote => listNote)
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
  return [note, fetching]
}
