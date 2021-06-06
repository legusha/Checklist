import React from 'react'
import PropTypes from 'prop-types'

export default function EmptyValue ({ text, classNameWrap = [] }) {
  EmptyValue.propTypes = {
    text: PropTypes.string,
  }

  return (
    <div className={classNameWrap.join(' ')}>
      {text}
    </div>
  )
}
