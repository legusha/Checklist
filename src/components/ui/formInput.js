import React from 'react'
import PropTypes from "prop-types";

FormInput.propTypes = {
  option: PropTypes.object,
  events: PropTypes.object
}

export default function FormInput ({ events, option }) {
  const { onChange, onSubmit } = events
  const { valueInput, titleBtn } = option

  return (
    <form onSubmit={onSubmit} className="p-4 border-secondary text-left d-flex justify-between">
      <input type="text" value={valueInput} onChange={onChange} className="input-primary input-big mr-4"/>
      <button className="btn-outline-success btn-big text-black bg-white" type="submit">{titleBtn}</button>
    </form>
  )
}
