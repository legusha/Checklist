import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context';
import {Modal} from '../components/ui';
import BButton from 'react-bootstrap/Button';

import { Checklist, Note, Todo } from '../logic'

export default class App extends Component {
  handleModalDisplay = (show = false) => {
    const modal = { ...this.state.modal }
    modal.show = show
    this.setState({ modal })
  }

  handleModalDisplayShow = ({ typeName }) => {
    return async () => {
      await this.setModalCurrentAction(typeName)
      this.handleModalDisplay(true)
    }
  }

  getModalCurrentAction = () => {
    const { currentAction, actions } = this.state.modal
    return actions.find(item => item.typeName === currentAction)
  }
  async setModalCurrentAction (typeName) {
    const newState = oldState => {
      const modal = {
        ...oldState.modal,
        currentAction: typeName
      }
      return {
        ...oldState,
        modal
      }
    }
    await this.setState(newState)
  }

  state = {
    checkList: new Checklist (new Note(), new Todo()),
    modal: {
      show: false,
      makeShow: this.handleModalDisplayShow,
      makeHide: this.handleModalDisplay.bind(this, false),
      actions: [
        {
          typeName: 'checklist:item:remove',
          content: {
            header: <div>Header</div>,
            body: <div>Body</div>,
            footer: <div>
              <BButton variant="secondary" onClick={this.handleModalDisplay.bind(this, false)}>
                Close
              </BButton>
              <BButton variant="primary" onClick={this.handleModalDisplay.bind(this, false)}>
                Save Changes
              </BButton>
            </div>
          }
        }
      ],
      currentAction: '',
    }
  }
  render() {
    const { handleModalDisplay, getModalCurrentAction } = this
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
          header={getModalCurrentAction()?.content?.header}
          body={getModalCurrentAction()?.content?.body}
          footer={getModalCurrentAction()?.content?.footer}
          handleShow={handleModalDisplay.bind(this, true)}
          handleClose={handleModalDisplay.bind(this, false)}
        />
      </div>
    )
  }
}
