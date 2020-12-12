import React from 'react'
import PropTypes from "prop-types";
import BButton from 'react-bootstrap/Button';

FormInput.propTypes = {
  option: PropTypes.object,
  events: PropTypes.object
}

export default function FormInput ({ btn, input, events }) {
  const { onChange, onSubmit } = events

  return (
    <form onSubmit={onSubmit} className="p-4 border text-left d-flex justify-between input-group d-flex align-items-center">
      <input type="text" value={input.value} onChange={onChange} className="mr-4 form-control" placeholder="Enter name"/>
      <BButton className="btn-outline-success bg-white l-height-26" size="lg" type="submit">{btn.title}</BButton>
    </form>
  )
}
