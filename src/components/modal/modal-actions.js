import React from 'react'
// import PropTypes from 'prop-types'
import { Modal } from '../ui'
import BButton from 'react-bootstrap/Button'

export default function ModalActions ({ modalService, modal }) {

  function setModalDisplay(show = false) {
    modalService.updateModal(show)
  }

  function getModalCurrentAction () {
    return modalService.currentAction()
  }

  // function setModalCurrentAction (typeName) {
  //   modalService.setModalCurrentAction(typeName)
  // }
  //
  // function handleModalDisplayShow ({ typeName }) {
  //   modalService.handleModalDisplayShow({ typeName })
  // }
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
