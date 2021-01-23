import React from 'react';
import BButton from 'react-bootstrap/Button';
import BModal from 'react-bootstrap/Modal';

function Modal({ show, handleClose, handleShow }) {
  return (
    <>
      <BButton variant="primary" onClick={handleShow}>
        Launch demo modal
      </BButton>

      <BModal show={show} onHide={handleClose}>
        <BModal.Header closeButton>
          <BModal.Title>Modal heading</BModal.Title>
        </BModal.Header>
        <BModal.Body>Woohoo, you're reading this text in a modal!</BModal.Body>
        <BModal.Footer>
          <BButton variant="secondary" onClick={handleClose}>
            Close
          </BButton>
          <BButton variant="primary" onClick={handleClose}>
            Save Changes
          </BButton>
        </BModal.Footer>
      </BModal>
    </>
  );
}

export default Modal;
