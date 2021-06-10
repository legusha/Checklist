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

export default function EmptyValue ({ text, classNameWrap = classNameWrapDef }) {
  EmptyValue.propTypes = {
    text: PropTypes.string,
  }

  return (
    <div className={classNameWrap.join(' ')}>
      {text}
    </div>
  )
}
