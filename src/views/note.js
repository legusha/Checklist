import React, {useEffect, useState} from 'react';
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';
import {WithModelContext} from '~/components/hoc';
import { FormInputWrap } from '~/components/ui';
import CheckboxList from "../components/checkbox-list";
import BButton from "react-bootstrap/Button";

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
  const [modalTodo, modalTodoUpdate] = useState({
    input: '',
    checkbox: false,
  })


  async function handleUpdateTitle (note, noteInput) {
    const newItem = {
      ...note,
      title: noteInput,
    };
    await app.checkList.noteUpdate(newItem);
    await fetchNote()
  }

  async function handleCheckboxChange(item) {
    const { checkList } = app;
    const newTodo = checkList.todoNew(item);
    await checkList.todoUpdate(newTodo);
    await fetchTodo();
  }
  function handleTodoAdd() {
    console.log(app.modal.context)
    console.log(app.modal.modal)
    console.log(app.modal.currentContentType)
    app.modal.updateWithItem(
      {},
      true,
      'checklist:todo:add',
      {
        'todo:add': app.checkList.todoNewCreate,
        modalTodo,
        formHandler: handleModalTodo
      })
  }
  function handleModalTodo(key, value) {
    modalTodoUpdate({
      ...modalTodo,
      [key]: value
    })
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

  async function fetchTodo() {
    const newTodo = await app.checkList.todoGetByNoteID({ noteID });
    updateTodo(newTodo)
  }

  async function fetchNote() {
    const noteData = await app.checkList.noteByID(noteID);
    updateNote(noteData);
  }

  useEffect(() => {
    async function fetchNoteList() {
      await fetchNote();
    }

    fetchNoteList();
  }, [noteID]);

  useEffect(() => {
    async function fetchTodoList() {
      await fetchTodo()
    }

    fetchTodoList();
  }, [noteID]);


  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={null}/>
      <FormInputWrap note={note} handler={handleUpdateTitle}/>
      <div className={'notes-list p-4 border mt-4'}>
        <BButton
          className="l-height-26"
          size="sm"
          onClick={handleTodoAdd}
          variant={'outline-primary'}
        >
          Add Todo
        </BButton>
        <div className="mt-3 d-flex flex-column">
          {renderTodo(todo)}
        </div>
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
