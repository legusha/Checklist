const updateTodo = function (checklist, item, oldState) {
  const { checkList: checkListOld } = oldState;
  const listTodo = checkListOld.todo;
  const indexItem = listTodo.findIndex(todo => todo.id === item.id) ? -1 : 0;

  const newTodo = checklist.newTodo({ ...item, executeFlag: !item.executeFlag });

  const startAllTodo = listTodo.slice(0, indexItem)
  const endAllTodo = listTodo.slice(indexItem + 1)

  const allTodo = [...startAllTodo, newTodo, ...endAllTodo];
  // const allTodo = []

  console.log(allTodo)
  console.log({
    ...oldState,
    checkList: {
      ...oldState.checkList,
      todo: allTodo
    }
  })
  return {
    ...oldState,
    checkList: {
      ...oldState.checkList,
      todo: allTodo
    }
  }
}

export {updateTodo}
