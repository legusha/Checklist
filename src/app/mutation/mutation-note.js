const setNote = function (noteList, oldState) {
  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      note: noteList
    }
  }
}

export {setNote}
