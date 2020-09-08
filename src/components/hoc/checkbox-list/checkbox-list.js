import React from 'react'
import { Checkbox } from '../../ui'

export default function CheckboxList ({ todo, events }) {
  const { self, onChangeCheckbox } = events

  const renderTodo = (item) => {
    const { id } = item
    const checkboxKey = `checkbox-${id}`
    const checkBoxProps = {
      option: {
        ...item,
        id
      },
      handler: onChangeCheckbox.bind(self, item)
    }

    return (
      <Checkbox key={checkboxKey} {...checkBoxProps}/>
    )
  }

 return (
   todo.map(renderTodo)
 )
}
