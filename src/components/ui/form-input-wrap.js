import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import FormInput from "./form-input";

export default function FormInputWrap ({ note, handler }) {
  FormInput.propTypes = {
    note: PropTypes.object,
    handler: PropTypes.func,
  }
  const noteInput = {
    btn: {
      title: 'Save'
    },
    input: {
      value: ''
    },
    events: {
      onChange: handleChangeFormInput,
      onSubmit: handleSubmitFormInput
    },
  }

  const [inputValue, updateInputValue] = useState(note?.title || '');
  const [noteItem, updateNoteItem] = useState(note);

  function updateNoteInputVal (val) {
    updateInputValue(val);
  }

  function handleChangeFormInput (e) {
    e.stopPropagation();
    updateNoteInputVal(getFormValue(e));
  }

  function handleSubmitFormInput (e) {
    e.preventDefault();
    e.stopPropagation();
    handler(noteItem, getFormValue(e));
    updateNoteInputVal('');
  }

  function getNoteInput() {
    return {
      ...noteInput,
      input: {value: inputValue}
    }
  }

  function getFormValue(e) {
    const target = e.target
    if (target.tagName === 'FORM') {
      const input = e.target.firstElementChild
      return input.value
    }
    return target.value
  }

  useEffect(() => {
    if (note) {
      updateNoteItem(note);
      updateNoteInputVal(note.title);
    }
  }, [note]);

  return (
    <FormInput {...getNoteInput()} />
  )
}
