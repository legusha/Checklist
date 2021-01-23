import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context';
import {Modal} from '../components/ui';
import BButton from 'react-bootstrap/Button';

export default class App extends Component {
  handleModalDisplay = (show = false) => {
    const modal = { ...this.state.modal }
    modal.show = show
    this.setState({ modal })
  }
  handleModalDisplayShow = ({ typeName }) => {
    return async (item) => {
      await this.setModalCurrentAction(typeName, { item })
      this.handleModalDisplay(true)
    }
  }
  handleModalAccept = () => {
    const props = this.state?.modal?.current?.props
    const { store, actions } = this.props
    store.dispatch(actions.checkListItemRemove(props))
    console.log(props)
    console.log(this.props)
  }

  getModalCurrentAction = () => {
    const { current, actions } = this.state.modal
    const currentAction = actions.find(item => item.typeName === current.typeName)
    return { ...currentAction, props: current.props }
  }
  async setModalCurrentAction (typeName = '', props = {}) {
    const newState = oldState => {
      const modal = {
        ...oldState.modal,
        current: {
          typeName: typeName,
          props: props
        },
      }
      return {
        ...oldState,
        modal
      }
    }
    await this.setState(newState)
  }


  state = {
    checkList: this.props.store.getState().checklist.checklist,
    modal: {
      show: false,
      current: {
        typeName: '',
        props: {}
      },
      currentAction: '',
      makeShow: this.handleModalDisplayShow,
      makeHide: this.handleModalDisplay.bind(this, false),
      actions: [
        {
          typeName: 'checklist:item:remove',
          content: {
            header: <div>Modal Accept</div>,
            body: <div>Are you sure? Do you want to delete item?</div>,
            footer: <div>
              <BButton variant="outline-primary" onClick={this.handleModalDisplay.bind(this, false)}>
                Cancel
              </BButton>
              <BButton variant="outline-danger" className={'ml-2'} onClick={this.handleModalAccept}>
                Accept
              </BButton>
            </div>
          }
        }
      ],
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
