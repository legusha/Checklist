import React, { Component, createRef, forwardRef } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';
import ModalActions from '../components/modal';
// import {Modal} from '../components/ui'
// import BButton from 'react-bootstrap/Button'

import { Checklist, Note, Todo, ModalService, mutation } from '../services';
import BButton from "react-bootstrap/Button";

const { updateTodo, updateNote } = mutation;
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
    const handler = this.state.modalService.setModalDisplay.bind(this, value);
    this.setState(handler)
  }

  showModal = async () => {
    await console.log(this.state.modal)
    this.state.modal.ref.current.toggle(true, this)
    console.log(this.state.modal)
    // console.log(this.state.modal.ref.current.toggle(true, this));
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
      ref: createRef(),
      actions: [
        {
          typeName: 'checklist:item:remove',
          content: {
            header: <div>Header</div>,
            body: <div>Body</div>,
            footer: <div>
              <BButton variant="secondary" onClick={this.showModal}>
                Close
              </BButton>
              <BButton variant="primary" onClick={this.showModal}>
                Save Changes
              </BButton>
            </div>
          }
        }
      ],
      currentAction: '',
    },
    modalService: {
      getModalCurrentAction: () => {},
      contextModal: () => {}
    },
  }

  // Hooks

  componentDidMount() {
    const { modal } = this.state
    const contextModal = this.initService(ModalService, modal);
    this.initApi('modalService', contextModal)
    console.log(contextModal)
    // contextModal.setModalDisplay(true, this);
    console.log(modal)
  }

  render() {
    const { checkList: checkListState, modal } = this.state
    const checkListAPI = {
      newTodo: checkList.newTodo.bind(checkList),
      newNote: checkList.newNote.bind(checkList),
      updateTodo: this.updateTodo,
      updateNote: this.updateNote
    }
    const apiModal = {
      updateModal: this.updateModal.bind(this),
      currentAction: () => modal.currentAction,
    }
    const contextCheckList = { state: checkListState, api: checkListAPI };

    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{checkList: contextCheckList, checkListAPI, modal}}>
            <Route path="/" component={PageBase} exact />
            <Route path="/note" component={PageNote} exact />
            <Redirect to={'/'}/>
          </ModelProvider>
        </Switch>
        <ModalActions modalService={apiModal} modal={modal} ref={modal.ref} />
      </div>
    )
  }
}
