const reducer = (initialState, actionsHandlers) => (state = initialState, action) => {

  const handlerAction = actionsHandlers[action.type]

  if (handlerAction) return handlerAction(action, state)
  return state
};

export default reducer;
