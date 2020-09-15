import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context';

import { Checklist, Note, Todo } from '../models'

export default class App extends Component {
  state = {
    checkList: new Checklist (new Note(), new Todo()),
  }
  render() {
    const { checkList } = this.state
    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{checkList}}>
            <Route path="/" component={PageBase} exact />
            <Route path="/note" component={PageNote} exact />
            <Redirect to={'/'}/>
          </ModelProvider>
        </Switch>
      </div>
    )
  }
}
