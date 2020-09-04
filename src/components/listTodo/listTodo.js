import React from 'react'
import { Checkbox } from '../ui'

export default function ListTodo ({ todo, handler }) {
  const renderTodo = (item, i) => {
    const id = item.noteId + i
    const checkBoxProps = {
      option: {
        ...item,
        id
      },
      handler
    }
    return (
      <Checkbox key={id} {...checkBoxProps}/>
    )
  }
 return (
   todo.map(renderTodo)
 )
}
