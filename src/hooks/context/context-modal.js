import React, {useState} from 'react'

export function useModal() {
  const [modal, setModal] = useState({
    show: false,
    context: {},
  })
  const [currentContentType, setCurrentContentType] = useState('')
  const modalProvider = {
    display: (show) => setModal({ ...modal, show }),
    updateContentType: (currentContentType) => setCurrentContentType(currentContentType),
  }

  return [{...modal, currentContentType}, modalProvider]
}

export function useModalContent() {
  const [modalContent, setModalContent] = useState([])
  return [modalContent, setModalContent]
}
