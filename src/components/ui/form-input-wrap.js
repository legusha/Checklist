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

  const [inputValue, updateInputValue] = useState(note?.title);
  const [noteItem, updateNoteItem] = useState(note);

  function updateNoteInputVal (val) {
    updateInputValue(val);
  }

  function handleChangeFormInput (e) {
    e.stopPropagation();
    updateNoteInputVal(e.target.value);
  }

  function handleSubmitFormInput (e) {
    e.preventDefault();
    e.stopPropagation();
    handler(noteItem, noteInput);
    updateNoteInputVal('');
  }


  useEffect(() => {
    if (note) {
      updateNoteItem(note);
      updateNoteInputVal(note.title);
    }
  }, [note]);

  return (
    <FormInput {...{...noteInput, input: {value: inputValue}}} />
  )
}
