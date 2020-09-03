import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Base from '../../views/base';
import Note from '../../views/note';

export default function App () {
  return (
    <div className="App, mt-4">
      <Switch>
        <Route path="/" component={Base} exact />
        <Route path="/note" component={Note} exact />
        <Redirect to={'/'}/>
      </Switch>
    </div>
  )
}
