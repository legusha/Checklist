import React, {useEffect, useState} from 'react';
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';
import {WithModelContext} from '~/components/hoc';
import { FormInputWrap } from '~/components/ui';
import CheckboxList from "../components/checkbox-list";

const todoEmptyValue = {
  text: 'Empty list',
  classNameWrapChecklist: [
    'w-100',
    'h-100',
    'd-flex',
    'align-items-center',
    'justify-content-center',
    'text-muted',
    'p-4',
    'border',
    'mt-4'
  ],
}

function Note({ match, app }) {

  const noteID = match.params.id;
  const [note, updateNote] = useState(null);
  const [todo, updateTodo] = useState([]);
  const todoEvent = {
    self: this,
    onChangeCheckbox: handleCheckboxChange
  }


  function handleUpdateTitle (note, noteInput) {
    const newItem = {
      ...note,
      title: noteInput,
    }
    app.checkList.noteUpdate(newItem)
  }

  function handleCheckboxChange(item) {
    console.log(item)
  }

  function renderTodo (listTodo) {
    if (listTodo.length === 0) return (
      <EmptyValue {...todoEmptyValue}/>
    )
    return (
      <CheckboxList
        todo={listTodo}
        events={todoEvent}
      />
    )
  }

  // Fetch

  useEffect(() => {
    async function fetchNote() {
      const noteData = await app.checkList.noteByID(noteID);
      updateNote(noteData);
    }

    fetchNote();
  }, [noteID]);

  useEffect(() => {
    async function fetchTodo() {
      const newTodo = await app.checkList.todoGetByNoteID({ noteID });
      updateTodo(newTodo)
    }

    fetchTodo();
  }, [noteID]);


  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={null}/>
      <FormInputWrap note={note} handler={handleUpdateTitle}/>
      <div className={'d-flex justify-between flex-wrap notes-list p-4 border mt-4'}>
        {/*<EmptyValue text={'Note not found'} />*/}
        {renderTodo(todo)}
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
