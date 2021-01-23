import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context';
import { Modal } from '../components/ui';

export default class App extends Component {
  handleModalDisplay = (show = false) => {
    const modal = { ...this.state.modal }
    modal.show = show
    this.setState({ modal })
  }


  state = {
    checkList: this.props.store.getState().checklist.checklist,
    modal: {
      show: false,
      actions: {
        show: this.handleModalDisplay.bind(this, true),
        hide: this.handleModalDisplay.bind(this, false),
      }
    }
  }
  render() {
    const { handleModalDisplay } = this
    const { checkList, modal } = this.state

    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{checkList, modal}}>
            <Route path="/" component={PageBase} exact />
            <Route path="/note" component={PageNote} exact />
            <Redirect to={'/'}/>
          </ModelProvider>
        </Switch>
        <Modal
          show={modal.show}
          handleShow={handleModalDisplay.bind(this, true)}
          handleClose={handleModalDisplay.bind(this, false)}
        />
      </div>
    )
  }
}
