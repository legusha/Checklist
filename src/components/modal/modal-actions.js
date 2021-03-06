import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {Modal} from '../ui'
import BButton from "react-bootstrap/Button";

export default function ModalActions () {
  const defaultModal = {
    show: true,
    makeShow: handleModalDisplayShow,
    makeHide: setModalDisplay.bind(this, false),
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
    currentAction: 'checklist:item:remove',
  }
  const [modal, updateModal] = useState(defaultModal)

  function setModalDisplay(show = false) {
    updateModal((newModal) => {
      return { ...newModal, show }
    })
  }

  function getModalCurrentAction () {
    const { currentAction, actions } = modal
    return actions.find(item => item.typeName === currentAction)
  }

  function setModalCurrentAction (typeName) {
    updateModal((newModal) => {
      return { ...newModal, currentAction: typeName }
    })
  }

  function handleModalDisplayShow ({ typeName }) {
    setModalCurrentAction(typeName)
    setModalDisplay(true)
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
