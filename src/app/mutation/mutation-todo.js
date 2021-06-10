const setTodo = function (todoList, oldState) {
  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      todo: todoList
    }
  }
}

export { setTodo }
