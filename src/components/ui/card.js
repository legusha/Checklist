import React from 'react'

export default function Card ({ header, body }) {
  return (
    <div className='card mb-3 note bg-white'>
      <div className='card-header text-left d-flex align-center justify-between bg-secondary'>{header}</div>
      <div className='card-body d-flex direction-column'>{body}</div>
    </div>
  )
}
