import React from 'react';
import BModal from 'react-bootstrap/Modal';

function Modal({ show, handleClose, header, body, footer, handleShow }) {
  return (
    <>
      <BModal show={show} onHide={handleClose}>
        <BModal.Header closeButton>
          { header }
        </BModal.Header>
        <BModal.Body>
          { body }
        </BModal.Body>
        <BModal.Footer>
          { footer }
        </BModal.Footer>
      </BModal>
    </>
  );
}

export default Modal;
