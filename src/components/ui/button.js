import React from 'react'
import PropTypes from 'prop-types'

Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  handler: PropTypes.func
}

export default function Button ({ color, label, handler }) {
  return (
    <button className={`btn-${color} btn-big`} onClick={handler}>{label}</button>
  )
}
