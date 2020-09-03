import React from 'react'
import PropTypes from "prop-types";

FormInput.propTypes = {
  option: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
}

export default function FormInput ({ option, onChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="p-4 border-secondary text-left d-flex justify-between">
      <input type="text" value={option.value} onChange={onChange} className="input-primary input-big mr-4"/>
      <button className="btn-outline-success btn-big text-black bg-white" type="submit">{option.titleBtn}</button>
    </form>
  )
}
