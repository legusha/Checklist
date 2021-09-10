import React, {useState} from 'react'

export default function useModal() {
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
