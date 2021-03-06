import React from 'react'
import PropTypes from 'prop-types'

export default function Card ({ header, body }) {
  Card.propTypes = {
    header: PropTypes.object,
    body: PropTypes.object
  }
  return (
    <div className='card mb-3 note bg-white'>
      <div className='card-header text-left d-flex align-center justify-between bg-secondary'>{header}</div>
      <div className='card-body d-flex direction-column'>{body}</div>
    </div>
  )
}
