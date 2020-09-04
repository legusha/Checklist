import React from 'react'

export default function Checkbox ({ option, handler }) {
  const { id, title, executeFlag } = option

  return (
    <div className="d-inline checkbox-wrap">
      <input
        className="checkbox checkbox-success"
        type="checkbox"
        checked={executeFlag}
        onChange={handler}
        id={id}
      />
      <label htmlFor={id} >{title}</label>
    </div>
  )
}
