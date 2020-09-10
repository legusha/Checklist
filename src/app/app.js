import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';

import { Note } from '../models'

export default function App () {
  return (
    <div className="App, mt-4">
      <Switch>
        <ModelProvider value={new Note()}>
          <Route path="/" component={() => <PageBase model={Note}/>} exact />
          <Route path="/note" component={PageNote} exact />
          <Redirect to={'/'}/>
        </ModelProvider>
      </Switch>
    </div>
  )
}
