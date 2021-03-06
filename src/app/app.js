import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context'
import ModalActions from '../components/modal'
import {Modal} from '../components/ui'
import BButton from 'react-bootstrap/Button'

import { Checklist, Note, Todo } from '../services'

export default class App extends Component {
  // handleModalDisplay = (show = false) => {
  //   const modal = { ...this.state.modal, show }
  //   this.setState({ modal })
  // }
  //
  // handleModalDisplayShow = ({ typeName }) => {
  //   return async () => {
  //     await this.setModalCurrentAction(typeName)
  //     this.handleModalDisplay(true)
  //   }
  // }

  // getModalCurrentAction = () => {
  //   const { currentAction, actions } = this.state.modal
  //   return actions.find(item => item.typeName === currentAction)
  // }
  // async setModalCurrentAction (typeName) {
  //   const newState = oldState => {
  //     const modal = {
  //       ...oldState.modal,
  //       currentAction: typeName
  //     }
  //     return {
  //       ...oldState,
  //       modal
  //     }
  //   }
  //   await this.setState(newState)
  // }

  state = {
    checkList: new Checklist (new Note(), new Todo()),
    modal: {
      show: false,
      makeShow: () => {},
      makeHide: () => {},
      currentAction: '',
    }
  }
  render() {
    // const { handleModalDisplay, getModalCurrentAction } = this
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
        <ModalActions/>
      </div>
    )
  }
}
