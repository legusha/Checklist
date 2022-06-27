import React from 'react'
import PropTypes from "prop-types"
import { Checkbox } from '../ui'

const { array, object } = PropTypes;

CheckboxList.propTypes = {
  todo: array,
  events: object,
}

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
      handler: onChangeCheckbox.bind(self, item),
      handlerOnRemove: events.onRemove,
    }

    return (
      <Checkbox
        key={checkboxKey}
        {...checkBoxProps}
      />
    )
  }

 return (
   todo.map(renderTodo)
 )
}
