import React from 'react'

import IconPencil from 'mdi-react/PencilIcon';
import IconClose from 'mdi-react/CloseIcon';

import { Card } from '../ui'

export default function CardList ({ list , view, action }) {

  const handleIconAction = (item, actionType) => {
    action(item, actionType)
  }

  const renderList = (list, view) => {
    const { render: renderView, helper: helperView } = view

    const renderList = list.map(item => {
      const { id, title } = item
      const cardBody = renderView(helperView(id))

      return (
        <div className='col-lg-4 col-md-6 col-12 mb-3' key={id}>
          <Card
            classNameWrap={['card', 'mb-3', 'note', 'bg-white', 'h-100']}
            header={
              <div className='d-flex align-center justify-between w-100'>
                <h3 className='m-0 font-18 font-weight-6'>{title}</h3>
                <div className='text-right'>
                  <IconPencil className='text-success cursor-point' onClick={() => handleIconAction(item, 'edit')}/>
                  <IconClose className='text-danger cursor-point' onClick={() => handleIconAction(item, 'delete')}/>
                </div>
              </div>
            }
            body={
              cardBody
            }
          />
        </div>
      )
    })

    return (
      <div className='row w-100 m-0'>
        {renderList}
      </div>
    )
  }
  return (
    <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
      {renderList(list, view)}
    </div>
  )
}
