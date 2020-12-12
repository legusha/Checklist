import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context';

export default class App extends Component {
  state = {
    checkList: this.props.store.getState().checklist.checklist
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
