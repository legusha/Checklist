import React, { Component } from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base'
import PageNote from '../views/note'

import { ModelProvider } from '../components/model-context'
import ModalActions from '../components/modal'
// import {Modal} from '../components/ui'
// import BButton from 'react-bootstrap/Button'

import { Checklist, Note, Todo, ModalService } from '../services'

const checkList = new Checklist (new Note(), new Todo())

export default class App extends Component {
  updateTodo = (item) => {
    this.setState((oldState) => {

      const { checkList: checkListOld } = oldState
      const listTodo = checkListOld.todo
      const indexItem = listTodo.findIndex(todo => todo.id === item.id) ? -1 : 0

      const newTodo = checkList.newTodo({ ...item, executeFlag: !item.executeFlag })

      const startAllTodo = listTodo.slice(0, indexItem)
      const endAllTodo = listTodo.slice(indexItem + 1)

      const allTodo = [...startAllTodo, newTodo, ...endAllTodo]

      return {
        ...oldState,
        checkList: {
          ...oldState.checkList,
          todo: allTodo
        }
      }
    })
  }

  initModalService = (Service, modal) => {
    const newService = new Service(modal)
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
      updateTodo: this.updateTodo
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
