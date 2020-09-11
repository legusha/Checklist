import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import PageBase from '../views/base';
import PageNote from '../views/note';

import { ModelProvider } from '../components/model-context';

import { Note, Todo } from '../models'

export default function App () {
  const note = new Note()
  const todo = new Todo()

  const mapNote = {
    instance: note,
    create: note.newItem
  }
  const mapTodo = {
    instance: todo,
    create: todo.newItem
  }
  return (
    <div className="App, mt-4">
      <Switch>
        <ModelProvider value={{mapNote, mapTodo}}>
          <Route path="/" component={PageBase} exact />
          <Route path="/note" component={PageNote} exact />
          <Redirect to={'/'}/>
        </ModelProvider>
      </Switch>
    </div>
  )
}
