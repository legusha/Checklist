export default class Checklist {

  #noteCountId = 100
  #todoCountId = 0

  constructor(note, todo) {
    this.note = note
    this.todo = todo
  }
  incrementNoteId () {
    this.#noteCountId = ++this.#noteCountId

    return this.#noteCountId
  }
  incrementTodoId () {
    this.#todoCountId = ++this.#todoCountId

    return this.#todoCountId
  }
  newItem(item, type = 'note') {
    const typeID = {
      note: this.incrementNoteId.bind(this),
      todo: this.incrementTodoId.bind(this),
    }
    const id = typeID[type]()
    return  { ...item, id }
  }
  newNote (item) {
    const newItem = this.newItem(item, 'note')
    return this.note.newItem(newItem)
  }
  newTodo (item) {
    const newItem = this.newItem(item, 'todo')
    return this.todo.newItem(newItem)
  }
  createNote (list, item) {
    return [...list, this.newItem(item)]
  }
}

