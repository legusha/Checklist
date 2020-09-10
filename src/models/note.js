export default class Note {
  #countId = 0
  constructor() {
    this.state = {}
  }
  newItem (props) {
    console.log(this)
    const { id = ++this.#countId } = props
    console.log(id)
    return {
      ...props,
      id
    }
  }
}
