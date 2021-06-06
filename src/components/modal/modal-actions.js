import React from 'react'
// import PropTypes from 'prop-types'
import { Modal } from '../ui'

export default function ModalActions ({ modal }) {

  function setModalDisplay(show = false) {
    modal.update(show)
  }

  function getModalCurrentContent () {
    return modal.currentContent()
  }

  return (
    <Modal
      show={modal.show}
      header={getModalCurrentContent()?.content?.header}
      body={getModalCurrentContent()?.content?.body}
      footer={getModalCurrentContent()?.content?.footer}
      handleShow={setModalDisplay.bind(this, true)}
      handleClose={setModalDisplay.bind(this, false)}
    />
  )
}
