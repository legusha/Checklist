import React from 'react'
import {
  contextModal
} from './context'

const { useModal, useModalContent } = contextModal

export default function useAppState({ request }) {
  const [modal, modalProvider] = useModal()
  const [modalContent, modalProviderContent] = useModalContent()

  // Modal

  const modalUpdateContent = (contentType) => {
    modalProvider.updateContentType(contentType)
  }

  const modalUpdate = (value) => {
    modalProvider.display(value)
}

  const modalToggle = (value) => {
    modalUpdate(value)
}

  const modalShow = () => {
    modalUpdate(true)
  }

  const modalHide = () => {
    modalUpdate(false)
  }

  const state = {
    modal: {
      ...modal,
      content: modalContent,
    }
  }
  const provider = {
    modal: {
      show: modalShow,
      hide: modalHide,
      update: modalUpdate,
      updateContent: modalUpdateContent,
      updateProviderContent: modalProviderContent,
      toggle: modalToggle
    }
  }
  return [state, provider]
}
