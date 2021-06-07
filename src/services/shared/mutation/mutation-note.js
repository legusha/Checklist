const updateNote = function (checklist, item, oldState) {
  const newNote = checklist.newNote(item)

  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      note: [newNote, ...oldState.checkList.note]
    }
  }
}

const deleteNote = function (item, oldState) {

  const listNote = oldState.checkList.note;
  const indexItem = listNote.findIndex(note => note.id === item.id);

  const startAllNote = listNote.slice(0, indexItem)
  const endAllNote = listNote.slice(indexItem + 1)

  const allNote = [...startAllNote, ...endAllNote];

  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      note: allNote,
    }
  }
}



const setNote = function (noteList, oldState) {
  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      note: noteList
    }
  }
}

export {updateNote, deleteNote, setNote}
