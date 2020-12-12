import { createStore, bindActionCreators, combineReducers } from 'redux';

import reducer from './reducer';
import { checklist } from './modules';

const mapRootReduce = {
  checklist: reducer(checklist.initialState, checklist.actions),
}

const rootReducer = combineReducers(mapRootReduce)
const store = createStore(rootReducer);
const { dispatch } = store;
const actions = bindActionCreators({...checklist.actionsTypes}, dispatch);

export {
  store,
  actions
}
