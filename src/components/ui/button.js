import React from 'react'
import PropTypes from 'prop-types'
import BButton from 'react-bootstrap/Button';

export default function Button ({ color, label, handler }) {
  Button.propTypes = {
    color: PropTypes.string,
    label: PropTypes.string,
    handler: PropTypes.func
  }
  return (
    <BButton className={`btn btn-${color} btn-big l-height-26`} onClick={handler}>{label}</BButton>
  )
}
