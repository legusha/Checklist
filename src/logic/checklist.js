export default class Checklist {

  #noteCountId = 100
  #todoCountId = 0
  #noteList = []

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
  newNote (props) {
    const id = this.incrementNoteId()
    const propsWithId = { ...props, id }
    const note = this.note.newItem(propsWithId)

    this.#noteList.push(note)

    return note
  }
  removeNote (id) {
    const list = this.#noteList
    const itemIndex = list.findIndex(item => item.id === id)
    this.#noteList.slice(itemIndex, 1)
  }
  newTodo (props) {
    const id = this.incrementTodoId()
    const propsWithId = { ...props, id }

    return this.todo.newItem(propsWithId)
  }

  getNotes () {
    return this.#noteList
  }
}

