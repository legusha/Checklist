const initialState = {
  id: 0,
  all: []
}

const actions = {
  incrementID: (action, state) => {
    const id = ++state.id
    return {...state, id }
  },
  newNote: (action, state) => {
    console.log(state)
    const newState = actions.incrementID(action, state)
    const id = newState.id
    const note = { ...action.payload, id }
    console.log(newState)
    const all = newState.all.push(note)
    return {...newState, all }
  },
}

const actionsTypes = {
  newNote: (payload) => ({ type: 'newNote', payload }),
}

export {
  initialState,
  actions,
  actionsTypes
}
