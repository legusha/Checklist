import React from 'react'
import PropTypes from 'prop-types'
import BButton from 'react-bootstrap/Button'

export default function FormInput ({ btn, input, events }) {
  FormInput.propTypes = {
    btn: PropTypes.object,
    input: PropTypes.object,
    events: PropTypes.object,
  }
  const { onChange, onSubmit } = events

  return (
    <form
      onSubmit={onSubmit}
      className="p-4 border text-left d-flex justify-between input-group d-flex align-items-center"
    >
      <input
        type="text"
        value={input.value}
        onChange={onChange}
        className="mr-4 form-control"
        placeholder="Note name"
        aria-label="Note name"
      />
      <BButton
        className="btn-outline-success bg-white l-height-26"
        size="lg"
        type="submit">{btn.title}
      </BButton>
    </form>
  )
}
