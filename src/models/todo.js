export default class Note {
  #countId = 100

  newItem (props) {
    const { id = ++this.#countId, executeFlag = false } = props
    return {
      ...props,
      id,
      executeFlag
    }
  }
}
