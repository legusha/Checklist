import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';
import ModalActions from '../components/modal';
// import {Modal} from '../components/ui'
// import BButton from 'react-bootstrap/Button'

import { Checklist, Note, Todo, ModalService, mutation } from '../services';

const { updateTodo, updateNote } = mutation;
const checkList = new Checklist (new Note(), new Todo());

export default class App extends Component {
  updateTodo = (item) => {
    const handler = updateTodo.bind(this, checkList, item);
    this.setState(handler);
  }
  updateNote = (item) => {
    const handler = updateNote.bind(this, checkList, item);
    this.setState(handler)
  }

  initModalService = (Service, modal) => {
    // const newService = new Service(modal);
    // console.log(newService);
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
      currentAction: '',
      makeShow: () => {},
      makeHide: () => {},
    }
  }
  render() {
    const { checkList: checkListState, modal } = this.state
    const checkListAPI = {
      newTodo: checkList.newTodo.bind(checkList),
      newNote: checkList.newNote.bind(checkList),
      updateTodo: this.updateTodo,
      updateNote: this.updateNote
    }
    const checkListContext = { state: checkListState, api: checkListAPI }

    this.initModalService(ModalService, modal)

    return (
      <div className="App, mt-4">
        <Switch>
          <ModelProvider value={{checkList: checkListContext, modal, checkListAPI}}>
            <Route path="/" component={PageBase} exact />
            <Route path="/note" component={PageNote} exact />
            <Redirect to={'/'}/>
          </ModelProvider>
        </Switch>
        <ModalActions ModalService={ModalService}/>
      </div>
    )
  }
}
