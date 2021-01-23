import {Checklist, Note, Todo} from '../../logic'

const initialState = {
  checklist: new Checklist (new Note(), new Todo())
}

const actions = {
  checkListItemRemove: (action, state) => {
    const { payload: { item } } = action
    state.checklist.removeNote(item.id)
    console.log(state.checklist)
    return {...state, checklist: state.checklist }
  },
}

const actionsTypes = {
  checkListItemRemove: (payload) => ({ type: 'checkListItemRemove', payload }),
}

export {
  initialState,
  actions,
  actionsTypes
}
