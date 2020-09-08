import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import Base from '../../pages/base';
import Note from '../../pages/note';

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
