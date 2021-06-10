import React from 'react'
import PropTypes from 'prop-types'

export default function Checkbox ({ option, handler }) {
  Checkbox.propTypes = {
    option: PropTypes.object,
    handler: PropTypes.func
  }
  const { id, title, complete } = option

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
    </div>
  )
}
