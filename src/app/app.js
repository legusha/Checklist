import React, { Component } from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Controller from './controller'

import PageBase from '~/views/base';
import PageNote from '~/views/note';

import { ModelProvider } from '~/components/model-context';
import ModalActions from '~/components/modal';
import ModalContent from '~/components/modal-content';

import { Checklist } from '~/services/shared';
import request from '~/services/shared/request';

const checkList = new Checklist ({newItem (props) {
    return {
      ...props
    }
  }}, {
  newItem (props) {
    const { executeFlag = false } = props
    return {
      ...props,
      executeFlag
    }
  }
});

export default class App extends Component {

  constructor(props) {
    super(props);
    this.contoller = new Controller({ checkList }, this.setState.bind(this));

    this.state = {
      checkList: {
        note: [],
        todo: [],
      },
      modal: {
        show: false,
        context: {},
        currentContentType: '',
      },
    }
    console.log(this.state.checkList);
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

  async componentDidMount() {
    const listNote = await request.getNote();
    const listTodo = await request.getTodo();
    this.contoller.setNote(listNote)
    this.contoller.setTodo(listTodo)
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
