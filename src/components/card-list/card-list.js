import React from 'react'

import { Card } from '../ui'

export default function CardList ({ list , view }) {

  const renderList = (list, view) => {
    const { render, helper } = view

    return list.map(item => {
      const { id, title } = item
      const listTodo = helper(id)
      const todo = render(listTodo)

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
      {renderList(list, view)}
    </div>
  )
}
