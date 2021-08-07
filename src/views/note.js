import React, {useEffect, useState} from 'react'
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';
import {WithModelContext} from "../components/hoc";
import {FormInput} from "../components/ui";

function Note({ match, app }) {

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

  const noteID = match.params.id;
  const [note, updateNote] = useState(null);
  const [noteInput, updateNoteInput] = useState(noteInputVal)

  const updateNoteInputVal = (val) => {
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

  async function fetchAuthData() {
    const noteData = await app.checkList.noteByID(noteID);
    updateNote(noteData);
    updateNoteInputVal(noteData.title)
  }

  useEffect(() => {
    fetchAuthData();
  }, []);

  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={null}/>
      <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
        <FormInput {...noteInput} />
        <EmptyValue text={'Note not found'} />
      </div>
    </section>
  );
}

const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Note, mapContextToProps)
