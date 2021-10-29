import {useEffect, useState} from 'react';
import {useFetching} from "../use-fetching";

export default function (noteID, request) {
  const [note, updateNote] = useState(null);
  const [fetchNote, processing, error] = useFetching(request.get)
  const [fetchNotePut, processingPut, errorPut] = useFetching(request.put)

  async function fetch(noteID) {
    const noteData = await fetchNote(noteID);
    updateNote(() =>noteData);
  }

  async function fetchNoteUpdate(item) {
    const noteData = await fetchNote(noteID);
    updateNote(() =>noteData);

    const params = {
      id: item.id,
      body: item
    }
    const newNote = await fetchNotePut(params);
    updateNote(() => newNote);
  }

  useEffect(() => {
    fetch(noteID)
  }, [noteID]);

  const fetching = {
    fetch,
    processing,
    error
  }

  const fetchingUpdate = {
    fetch: fetchNoteUpdate,
    processing: processingPut,
    error: errorPut,
  }

  return [note, fetching, fetchingUpdate]
}
