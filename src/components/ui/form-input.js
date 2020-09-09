import React from 'react'
import PropTypes from "prop-types";

FormInput.propTypes = {
  option: PropTypes.object,
  events: PropTypes.object
}

export default function FormInput ({ btn, input, events }) {
  const { onChange, onSubmit } = events

  return (
    <form onSubmit={onSubmit} className="p-4 border-secondary text-left d-flex justify-between">
      <input type="text" value={input.value} onChange={onChange} className="input-primary input-big mr-4"/>
      <button className="btn-outline-success btn-big text-black bg-white" type="submit">{btn.title}</button>
    </form>
  )
}
