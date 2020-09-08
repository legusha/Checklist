import React from 'react'

import { Card } from '../../ui'
import CheckboxList from '../checkbox-list';

export default function CardList ({ lists }) {
  const { note, todo, events } = lists

  const searchTodo = (todo, id) => {
    return todo.filter(item => item.noteId === id)
  }

  const renderTodo = (listTodo) => {
    return (
      <CheckboxList
        todo={listTodo}
        events={events}
      />
    )
  }
  const renderList = (listNote, allListTodo, renderTodo) => {

    return listNote.map(item => {
      const { id, title } = item
      const listTodo = searchTodo(allListTodo, id)
      const todo = renderTodo.call(this, listTodo)

      return (
        <Card
          key={id}
          header={
            <h3 className='m-0'>{title}</h3>
          }
          body={
            todo
          }
        />
      )
    })
  }
  return (
    <div className={'d-flex justify-between flex-wrap notes-list p-4 border-secondary'}>
      {renderList(note, todo, renderTodo)}
    </div>
  )
}
