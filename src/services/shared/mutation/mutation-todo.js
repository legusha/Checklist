const updateTodo = function (checklist, item, oldState) {
  const { checkList: checkListOld } = oldState;
  const listTodo = checkListOld.todo;
  const indexItem = listTodo.findIndex(todo => todo.id === item.id);

  const newTodo = { ...item, executeFlag: !item.executeFlag };

  const startAllTodo = listTodo.slice(0, indexItem)
  const endAllTodo = listTodo.slice(indexItem + 1)

  const allTodo = [...startAllTodo, newTodo, ...endAllTodo];

  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      todo: allTodo
    }
  }
}

const setTodo = function (todoList, oldState) {
  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      todo: todoList
    }
  }
}

export {updateTodo, setTodo}
