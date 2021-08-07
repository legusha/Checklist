import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import FormInput from "./form-input";

export default function FormInputWrap ({ note }) {
  // FormInput.propTypes = {
  //   btn: PropTypes.object,
  //   input: PropTypes.object,
  //   events: PropTypes.object,
  // }
  const noteInputVal = {
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

  const [noteInput, updateNoteInput] = useState(noteInputVal)

  function updateNoteInputVal (val) {
    const formInput = { ...noteInput };
    formInput.input.value = val;
    updateNoteInput(formInput)
  }

  function handleChangeFormInput (e) {
    e.stopPropagation();
    updateNoteInputVal(e.target.value);
  }

  function handleSubmitFormInput (e) {
    e.preventDefault();
    e.stopPropagation();

    const formInput = { ...noteInput };
    console.log(formInput.input.value)
    // this.props.app.checkList.noteNew({title: formInput.input.value});
    updateNoteInputVal('');
    formInput.input.value = '';
  }

  useEffect(() => {
    if (note?.title) {
      updateNoteInputVal(note.title);
    }
  }, [note]);

  return (
    <FormInput {...noteInput} />
  )
}
