import React from 'react'
import {useDispatch, useSelector} from "react-redux";
import ModalContent from 'components/modal-content';
import {
  modalToggle,
  modalShow,
  modalHide,
  modalUpdateContentType,
  modalUpdateContent
} from 'store/modal-reducer'

export default function useModal() {
  const modal = useSelector(state => state.modalReducer)
  const dispatch = useDispatch()

  function initModalContent(props = {}) {
    return ModalContent({
      handlers: {
        modalShow: () => dispatch(modalShow()),
        modalHide: () => dispatch(modalHide()),
      },
      modal: initModal(),
      props,
    })
  }

  // Init handlers
  function initModal() {
    return {
      update: (value, modalContentType = 'checklist:item:remove') => {
        dispatch(modalUpdateContentType(modalContentType))
        dispatch(modalToggle(value))
      },
      updateWithItem: (item, value, modalContentType = 'checklist:item:remove', props) => {
        console.log(props)
        dispatch(modalUpdateContentType(modalContentType))
        dispatch(modalUpdateContent(initModalContent({ item, ...props })))
        dispatch(modalToggle(value))
      },
      currentContent: () => {
        const { contentType } = modal
        return modal.content.find(item => item.typeName === contentType)
      },
    }
  }
  return {
    modal,
    initModal,
  }
}
