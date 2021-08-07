import BButton from "react-bootstrap/Button";
import React, {useState} from 'react'

import ContentTodo from './modal-content-todo'

export default function ({ handlers, modal, props }) {
  const { modalHide } = handlers

  function handlerWrap(show = false, handler, ...args) {
    handler(...args)
    modal.update(show)
  }
  console.log(props)
  return [
    {
      typeName: 'checklist:item:edit',
      content: {
        header: <div className="font-20 font-weight-6 text-muted">Are you sure?</div>,
        body: <div className="font-14 font-weight-6">Go to the edit note page?</div>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide}>
            Cancel
          </BButton>
          <BButton variant="primary" onClick={handlerWrap.bind(null, false, props.edit, props.item)} className="ml-3">
            Accept
          </BButton>
        </div>
      }
    },
    {
      typeName: 'checklist:item:remove',
      content: {
        header: <div className="font-20 font-weight-6 text-muted">Are you sure?</div>,
        body: <div className="font-14 font-weight-6">Please accept deleting note or cancel.</div>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide}>
            Cancel
          </BButton>
          <BButton variant="primary" onClick={handlerWrap.bind(null, false, props.delete, props.item)} className="ml-3">
            Accept
          </BButton>
        </div>
      }
    },
    {
      typeName: 'checklist:todo:add',
      content: {
        header: <div className="font-20 font-weight-6 text-muted">Are you sure, create todo?</div>,
        body: <ContentTodo {...props}/>,
        footer: <div>
          <BButton variant="secondary" onClick={modalHide}>
            Cancel
          </BButton>
          <BButton variant="primary" onClick={() => handlerWrap(false, props['todo:add'], props.modalTodo)} className="ml-3">
            Create
          </BButton>
        </div>
      }
    }
  ]
}
