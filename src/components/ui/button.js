import React from 'react'
import PropTypes from 'prop-types'

Button.propTypes = {
  color: PropTypes.string,
  label: PropTypes.string,
  handler: PropTypes.func
}

export default function Button ({ color, label, handler }) {
  return (
    <BButton className={`btn btn-${color} btn-big`} size="lg" onClick={handler}>{label}</BButton>
  )
}
