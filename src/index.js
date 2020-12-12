import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import {BrowserRouter} from 'react-router-dom'
import * as serviceWorker from './serviceWorker'

import './assets/scss/main.scss'
import * as store from './store'

const {store: nestedStore, actions} = store

nestedStore.dispatch(actions.inc())
nestedStore.dispatch(actions.rnd(33))

console.log(nestedStore.getState())
const application = (
  <React.StrictMode>
    <BrowserRouter>
      <App
        store={nestedStore}
        actions={actions}
      />
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(
  application,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
