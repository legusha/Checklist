import React, {useEffect, useState} from 'react';
import {Topbar} from '~/components/layout';
import EmptyValue from '~/components/empty-value';
import {WithModelContext} from '~/components/hoc';
import { FormInputWrap } from '~/components/ui';
import CheckboxList from "../components/checkbox-list";
import ModalActions from '~/components/modal';
import BButton from "react-bootstrap/Button";
import request from '~/services/request';
import { context } from '~/hooks';

const { useNoteOnce, useTodoOnce, useModal } = context

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

function Note({ match }) {

  const noteID = match.params.id;
  const [note, fetchNote, fetchNoteUpdate] = useNoteOnce(noteID, { get: request.getNoteByID, put: request.putNote })
  const [todo, fetchTodo] = useTodoOnce(noteID, request.getTodoByNoteID)

  const todoEvent = {
    self: this,
    onChangeCheckbox: handleCheckboxChange
  }
  const [modalTodo, modalTodoUpdate] = useState({
    input: '',
    checkbox: false,
  })
  // Modal
  const { modal: modalState, initModal } = useModal()
  const apiModal = initModal()
  const modal = {
    ...modalState,
    ...apiModal
  }


  async function handleUpdateTitle (note, noteInput) {
    const item = {
      ...note,
      title: noteInput,
    };
    await fetchNoteUpdate.fetch(item)
    await fetchNote.fetch(noteID)
  }

  async function handleCheckboxChange(item) {
    const toggleComplete = (props) => ({...props, complete: !props.complete})
    const newTodo = toggleComplete(item);
    await request.updateTodo(newTodo);
    await fetchTodo.fetch(noteID);
  }
  function handleTodoAdd() {
    modal.updateWithItem(
      {},
      true,
      'checklist:todo:add',
      {
        'todo:add': (props) => console.log('todoNewCreate', props),
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
      <ModalActions modal={modal} />
    </section>
  );
}

const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Note, mapContextToProps)
