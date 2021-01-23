import { createStore, bindActionCreators, combineReducers } from 'redux';

import reducer from './reducer';
import {
  checklist,
  note,
  todo
} from './modules';

const mapRootReduce = {
  checklist: reducer(checklist.initialState, checklist.actions),
  note: reducer(note.initialState, note.actions),
  todo: reducer(todo.initialState, todo.actions),
}

const mapActions = {
  ...checklist.actionsTypes,
  ...note.actionsTypes,
  ...todo.actionsTypes,
}

const rootReducer = combineReducers(mapRootReduce)
const store = createStore(rootReducer);
const { dispatch } = store;
const actions = bindActionCreators(mapActions, dispatch);

export {
  store,
  actions
}
