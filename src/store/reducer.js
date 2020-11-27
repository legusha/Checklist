import {Checklist, Note, Todo} from '../logic'

const defaultState = {
  counter: 0,
  checkList: new Checklist (new Note(), new Todo()),
}

const handlersActionsType = {
  RND: (action, state) => state.counter + action.payload,
  INC: (action, state) => state.counter + 1,
  DEC: (action, state) => state.counter - 1,
}
const reducer = (state = defaultState, action) => {

  const handlerAction = handlersActionsType[action.type]

  if (handlerAction) return handlerAction(action, state)
  return state
};

export default reducer;
