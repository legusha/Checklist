import {Checklist, Note, Todo} from '../../logic'

const initialState = {
  checklist: new Checklist (new Note(), new Todo()),
  counter: 1
}

const actions = {
  INC: (action, state) => {
    const counter = state.counter + 1
    return {...state, counter }
  },
}

const actionsTypes = {
  inc: () => ({ type: 'INC' }),
}

export {
  initialState,
  actions,
  actionsTypes
}
