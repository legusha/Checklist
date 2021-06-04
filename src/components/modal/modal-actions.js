import React, { forwardRef, useImperativeHandle } from 'react'
// import PropTypes from 'prop-types'
import { Modal } from '../ui'
import BButton from 'react-bootstrap/Button'


// export default forwardRef(({ modalService, modal }, ref) => {
//
//   const defaultModal = {
//     show: false,
//     actions: [
//       {
//         typeName: 'checklist:item:remove',
//         content: {
//           header: <div>Header</div>,
//           body: <div>Body</div>,
//           footer: <div>
//             <BButton variant="secondary" onClick={setModalDisplay.bind(this, false)}>
//               Close
//             </BButton>
//             <BButton variant="primary" onClick={setModalDisplay.bind(this, false)}>
//               Save Changes
//             </BButton>
//           </div>
//         }
//       }
//     ],
//     currentAction: '',
//   }
//   // const [modal, updateModal] = useState(defaultModal)
//   // const modalService = new ModalService(modal, updateModal)
//
//
//   function setModalDisplay(show = false) {
//     modalService.updateModal(show)
//   }
//
//   function getModalCurrentAction () {
//     return modalService.currentAction()
//   }
//
//   // function setModalCurrentAction (typeName) {
//   //   modalService.setModalCurrentAction(typeName)
//   // }
//   //
//   // function handleModalDisplayShow ({ typeName }) {
//   //   modalService.handleModalDisplayShow({ typeName })
//   // }
//
//   useImperativeHandle(ref, () => ({
//     toggle: setModalDisplay
//   }));
//
//   return (
//     <Modal
//       show={modal.show}
//       header={getModalCurrentAction()?.content?.header}
//       body={getModalCurrentAction()?.content?.body}
//       footer={getModalCurrentAction()?.content?.footer}
//       handleShow={setModalDisplay.bind(this, true)}
//       handleClose={setModalDisplay.bind(this, false)}
//     />
//   )
// })

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
