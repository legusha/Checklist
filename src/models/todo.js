export default class Todo {
  newItem (props) {
    const { executeFlag = false } = props
    return {
      ...props,
      executeFlag
    }
  }
}
