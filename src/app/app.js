import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Controller from './controller'

import PageBase from '@views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';
import ModalActions from '../components/modal';
import ModalContent from '../components/modal-content';

import { Checklist, Note, Todo } from '../services';
const checkList = new Checklist (new Note(), new Todo());


export default class App extends Component {

  constructor(props) {
    super(props);
    this.contoller = new Controller({ checkList }, this.setState.bind(this));

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
        context: {},
        currentContentType: '',
      },
    }

    this.modalContent = this.initModalContent();
  }

  // Init handlers

  initApiCheckList = () => {
    return {
      newTodo: checkList.newTodo.bind(checkList),
      newNote: checkList.newNote.bind(checkList),
      updateTodo: this.contoller.updateTodo,
      updateNote: this.contoller.updateNote,
      deleteNote: this.contoller.deleteNote,
    }
  }
  initApiModal = () => {
    const { modal } = this.state;
    return {
      update: (value, modalContentType = 'checklist:item:remove') => {
        this.contoller.modalUpdateContent(modalContentType);
        this.contoller.modalToggle(value)
      },
      updateWithItem: (item, value, modalContentType = 'checklist:item:remove', props) => {
        this.contoller.modalUpdateContent(modalContentType);
        this.modalContent = this.initModalContent({ item, ...props })
        this.contoller.modalToggle(value)
      },
      currentContent: () => {
        const { currentContentType } = modal
        return this.modalContent.find(item => item.typeName === currentContentType)
      },
    }
  }
  initModalContent(props = {}) {
    return ModalContent({
      handlers: {
        modalShow: this.contoller.modalShow.bind(this.contoller),
        modalHide: this.contoller.modalHide.bind(this.contoller)
      },
      modal: this.initApiModal(),
      props,
    })
  }

  // Hooks

  render() {
    const { checkList: checkListState, modal } = this.state;
    const apiCheckList = this.initApiCheckList();
    const apiModal = this.initApiModal();

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
        <ModalActions modal={app.modal} />
      </div>
    )
  }
}
