import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Controller from './controller'

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';
import ModalActions from '../components/modal';
import ModalContent from '../components/modal-content';

import { Checklist, Note, Todo } from '../services';

// const { updateTodo, updateNote, setModalDisplay, setModalAction } = mutation;
const checkList = new Checklist (new Note(), new Todo());


export default class App extends Component {

  // Init methods

  // initService = (Service, ...args) => new Service(...args, this.setState);
  // initApi = (rootKeyState, api) => {
  //   this.setState((oldState) => {
  //     return {
  //       ...oldState,
  //       [rootKeyState]: api
  //     }
  //   })
  // }

  constructor(props) {
    super(props);
    this.contoller = new Controller({ checkList }, this.setState.bind(this))

    this.state = {
      checkList: {
        note: [
          checkList.newNote({title: 'Note #1'}),
          checkList.newNote({title: 'Note #2'}),
          checkList.newNote({title: 'Note #3'}),
          checkList.newNote({title: 'Note #4'}),
        ],
        todo: [
          checkList.newTodo({noteId: 105, title: 'Checkbox First notes'}),
          checkList.newTodo({noteId: 105, title: 'Checkbox Second notes'}),
          checkList.newTodo({noteId: 106, title: 'Checkbox Three notes'}),
          checkList.newTodo({noteId: 108, title: 'Checkbox First notes 2'}),
        ],
      },
      modal: {
        show: false,
        makeShow: this.showModal,
        makeHide: () => {},
        context: {},
        actions: ModalContent({
          handlers: {
            modalShow: this.contoller.showModal.bind(this.contoller),
            modalHide: this.contoller.hideModal.bind(this.contoller)
          }
        }),
        currentAction: '',
      },
    }
  }

  // Hooks

  render() {
    const { checkList: checkListState, modal } = this.state
    const apiCheckList = {
      newTodo: checkList.newTodo.bind(checkList),
      newNote: checkList.newNote.bind(checkList),
      updateTodo: this.contoller.updateTodo,
      updateNote: this.contoller.updateNote
    }
    const apiModal = {
      updateModal: (value, modalContentType = 'checklist:item:remove') => {
        this.contoller.updateModalActionType(modalContentType);
        this.contoller.modalToggle(value)
      },
      currentAction: () => {
        const { currentAction, actions } = modal
        return actions.find(item => item.typeName === currentAction)
      },
    }

    const app = {
      checkList: {
        ...checkListState,
        ...apiCheckList,
      },
      modal: {
        ...modal,
        ...apiModal
      }
    }

    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{ app }}>
            <Route path="/" component={PageBase} exact />
            <Route path="/note" component={PageNote} exact />
            <Redirect to={'/'}/>
          </ModelProvider>
        </Switch>
        <ModalActions modalService={apiModal} modal={modal} />
      </div>
    )
  }
}
