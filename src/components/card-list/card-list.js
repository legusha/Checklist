import React from 'react'
import PencilIcon from 'mdi-react/PencilIcon';

import { Card } from '../ui'

export default function CardList ({ list , view }) {

  const renderList = (list, view) => {
    const { render: renderView, helper: helperView } = view

    return list.map(item => {
      const { id, title } = item
      const cardBody = renderView(helperView(id))

      return (
        <Card
          key={id}
          header={
            <div className='d-flex align-center justify-between w-100'>
              <h3 className='m-0'>{title}</h3>
              <div className='text-right'>
                <PencilIcon className='text-success' />
              </div>
            </div>
          }
          body={
            cardBody
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
