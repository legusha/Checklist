import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({ header, body, classNameWrap = ['card', 'mb-3', 'note', 'bg-white'] }) {
  Card.propTypes = {
    header: PropTypes.object,
    body: PropTypes.object
  }
  return (
    <div className={classNameWrap.join(' ')}>
      <div className='card-header text-left d-flex align-center justify-between bg-secondary'>{header}</div>
      <div className='card-body d-flex direction-column'>{body}</div>
    </div>
  )
}
