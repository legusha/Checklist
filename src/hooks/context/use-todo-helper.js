
export default function (todos) {
  const toggleComplete = (props) => ({...props, complete: !props.complete})
  const findByNoteId = (id) => todos.filter(item => item.noteId === id)
  return {
    toggleComplete,
    findByNoteId
  }
}
