import React, { useState } from 'react'
// import PropTypes from 'prop-types'
import { Modal } from '../ui'
import BButton from 'react-bootstrap/Button'

export default function ModalActions ({ ModalService }) {

  const defaultModal = {
    show: false,
    actions: [
      {
        typeName: 'checklist:item:remove',
        content: {
          header: <div>Header</div>,
          body: <div>Body</div>,
          footer: <div>
            <BButton variant="secondary" onClick={setModalDisplay.bind(this, false)}>
              Close
            </BButton>
            <BButton variant="primary" onClick={setModalDisplay.bind(this, false)}>
              Save Changes
            </BButton>
          </div>
        }
      }
    ],
    currentAction: '',
  }
  const [modal, updateModal] = useState(defaultModal)
  const modalService = new ModalService(modal, updateModal)


  function setModalDisplay(show = false) {
    modalService.setModalDisplay(show)
  }

  function getModalCurrentAction () {
    return modalService.getModalCurrentAction()
  }

  function setModalCurrentAction (typeName) {
    modalService.setModalCurrentAction(typeName)
  }

  function handleModalDisplayShow ({ typeName }) {
    modalService.handleModalDisplayShow({ typeName })
  }

  return (
    <Modal
      show={modal.show}
      header={getModalCurrentAction()?.content?.header}
      body={getModalCurrentAction()?.content?.body}
      footer={getModalCurrentAction()?.content?.footer}
      handleShow={setModalDisplay.bind(this, true)}
      handleClose={setModalDisplay.bind(this, false)}
    />
  )
}
