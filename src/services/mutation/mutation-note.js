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

export {updateNote}
