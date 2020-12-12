import {Checklist, Note, Todo} from '../../logic'

const initialState = {
  checklist: new Checklist (new Note(), new Todo()),
  counter: 1
}

const actions = {
  RND: (action, state) => {
    console.log(action)
    const counter = state.counter + action.payload
    return {...state, counter }
  },
  INC: (action, state) => {
    const counter = state.counter + 1
    return {...state, counter }
  },
  DEC: (action, state) => state.counter - 1,
}

const actionsTypes = {
  inc: () => ({ type: 'INC' }),
  dec: () => ({ type: 'DEC' }),
  rnd: (payload) => ({ type: 'RND', payload })
}

export {
  initialState,
  actions,
  actionsTypes
}
