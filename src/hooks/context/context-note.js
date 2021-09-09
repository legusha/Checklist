import React, {useState} from 'react'

export default function useNote() {
  const [note, setNote] = useState([])
  return [note, setNote]
}
