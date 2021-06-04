import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';
import ModalActions from '../components/modal';
import ModalContent from '../components/modal-content';

import { Checklist, Note, Todo, mutation } from '../services';

const { updateTodo, updateNote, setModalDisplay } = mutation;
const checkList = new Checklist (new Note(), new Todo());


export default class App extends Component {

  // Service methods

  updateTodo = (item) => {
    const handler = updateTodo.bind(this, checkList, item);
    this.setState(handler);
  }
  updateNote = (item) => {
    const handler = updateNote.bind(this, checkList, item);
    this.setState(handler)
  }
  updateModal = (value) => {
    const handler = setModalDisplay.bind(this, value);
    this.setState(handler)
  }

  showModal = async () => {
    await console.log(this.state.modal)
    this.updateModal(true)
    console.log(this.state.modal)
  }

  // Init methods

  initService = (Service, ...args) => new Service(...args, this.setState);
  initApi = (rootKeyState, api) => {
    this.setState((oldState) => {
      return {
        ...oldState,
        [rootKeyState]: api
      }
    })
  }

  state = {
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
      actions: ModalContent({handlers: {showModal: this.showModal, modalHide: this}}),
      currentAction: 'checklist:item:remove',
    },
  }

  // Hooks

  render() {
    const { checkList: checkListState, modal } = this.state
    const apiCheckList = {
      newTodo: checkList.newTodo.bind(checkList),
      newNote: checkList.newNote.bind(checkList),
      updateTodo: this.updateTodo,
      updateNote: this.updateNote
    }
    const apiModal = {
      updateModal: this.updateModal.bind(this),
      currentAction: () => {
        const { currentAction, actions } = modal
        return actions.find(item => item.typeName === currentAction)
      },
    }
    const contextCheckList = { state: checkListState, api: apiCheckList };

    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{checkList: contextCheckList, apiCheckList, modal}}>
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
