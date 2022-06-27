import React from 'react'
import PropTypes from 'prop-types'
import IconClose from "mdi-react/CloseIcon";

Checkbox.propTypes = {
  option: PropTypes.object,
  handler: PropTypes.func,
  handlerOnRemove: PropTypes.func
}

export default function Checkbox ({ option, handler, handlerOnRemove }) {
  const { id, title, complete } = option

  const IconRemove = () =>
    handlerOnRemove ?
      <IconClose className='text-danger cursor-point' onClick={() => handlerOnRemove(id)}/> :
      null

  return (
    <div className="d-inline checkbox-wrap">
      <input
        className="checkbox checkbox-success"
        type="checkbox"
        checked={complete}
        onChange={handler}
        id={id}
      />
      <label htmlFor={id} >{title}</label>
      <IconRemove/>
    </div>
  )
}
