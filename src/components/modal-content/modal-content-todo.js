import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'

const { object, func } = PropTypes;

FormInput.propTypes = {
  modalTodo: object,
  formHandler: func,
}

export default function FormInput ({ modalTodo, formHandler }) {
  // const { onChange, onSubmit } = events
  // modalTodo.checkbox
  const [inputValue, setInputValue] = useState(modalTodo.input)

  useEffect(() => {
    formHandler('input', inputValue)
  }, [inputValue])

  return (
    <form
      className="p-3 text-left d-flex justify-between input-group d-flex align-items-center"
    >
      <input
        type="text"
        value={inputValue}
        onChange={
          (e) => {
            setInputValue(e.target.value)
            formHandler('input', e.target.value)
          }
        }
        className="mr-4 form-control"
        placeholder="Note name"
        aria-label="Note name"
      />
    </form>
  )
}
