import { createStore, bindActionCreators } from 'redux';

import reducer from './reducer';
import * as actionsMap from './actions';

const store = createStore(reducer);
const { dispatch } = store;

const actions = bindActionCreators(actionsMap, dispatch);


export {
  store,
  actions
}
