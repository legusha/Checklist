import {useEffect, useState} from 'react';
import {useFetching} from "../use-fetching";

export default function (noteID, request) {
  const [note, updateNote] = useState(null);
  const [fetchNote, processing, error] = useFetching(request)

  async function fetch(noteID) {
    const noteData = await fetchNote(noteID);
    updateNote(() =>noteData);
  }

  useEffect(() => {
    fetch(noteID)
  }, [noteID]);

  const fetching = {
    fetch,
    processing,
    error
  }

  return [note, fetching]
}
