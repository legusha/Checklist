import React from 'react'

import IconPencil from 'mdi-react/PencilIcon';
import IconClose from 'mdi-react/CloseIcon';

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
              <h3 className='m-0 font-18 font-weight-5'>{title}</h3>
              <div className='text-right'>
                <IconPencil className='text-success cursor-point' />
                <IconClose className='text-danger cursor-point' />
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
    <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
      {renderList(list, view)}
    </div>
  )
}
