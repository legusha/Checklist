import React from 'react'
import PropTypes from 'prop-types'

const classNameWrapDef = [
  'w-100',
  'h-100',
  'd-flex',
  'align-items-center',
  'justify-content-center',
  'text-muted',
]

EmptyValue.propTypes = {
  text: PropTypes.string,
  classNameWrap: PropTypes.array,
}

export default function EmptyValue ({ text, classNameWrap = classNameWrapDef }) {

  return (
    <div className={classNameWrap.join(' ')}>
      {text}
    </div>
  )
}
