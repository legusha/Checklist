import React, {useEffect, useState} from 'react'

import { FormInputWrap } from 'components/ui'
import CardList from 'components/card-list'
import CheckboxList from 'components/checkbox-list'
import EmptyValue from 'components/empty-value'
import { WithModelContext } from 'components/hoc'
import {Topbar} from 'components/layout'
import { WithProcessing } from 'components/hoc'
import ModalActions from 'components/modal'
import ErrorView from 'views/error'

import useButtonsIndex from './use-buttons-index'
import { context } from 'hooks';
import request from 'services/request';

const { useContextNote: useNote, useContextTodoList: useTodo, useTodoHelper, useModal } = context;

function Base ({ history }) {
  // Context
  const [notes, fetchNote] = useNote(request.getNote)
  const [todos, fetchTodo] = useTodo(request.getTodo)
  const {
    toggleComplete: todoToggleComplete,
    findByNoteId: todoFindByNoteID,
  } = useTodoHelper(todos)
  const fetchProcessing = [fetchNote.processing, fetchTodo.processing]
  const fetchErrors = [fetchNote.error, fetchTodo.error]

  // Modal
  const { modal: modalState, initModal } = useModal()
  const apiModal = initModal()
  const modal = {
    ...modalState,
    ...apiModal
  }
  // Buttons
  const buttonsVariant = [
    {
      to: '/note',
      label: 'Add',
      color: 'success',
      nextCurrentIndex: 1,
      onClick: toggleFormInput
    },
    {
      to: '/',
      label: 'Cancel',
      color: 'primary',
      nextCurrentIndex: 0,
      onClick: toggleFormInput
    }
  ]
  const [setButtonsIndex, buttonsCreate] = useButtonsIndex(buttonsVariant, handleButtons)
  const [displayFormInput, setDisplayFormInput] = useState(false)

  // Checklist action
  const [checkList] = useState({
    events: {
      self: this,
      onChangeCheckbox: handleChangeListNote,
      onActionCard: handleActionCard,
      actionsModal: [
        {
          typeName: 'edit',
          handler: modal.updateWithItem,
          args: [true, 'checklist:item:edit', {
            edit: ({id}) => {
              history.push(`/note/${id}`)
            }
          }]
        },
        {
          typeName: 'delete',
          handler: modal.updateWithItem,
          args: [true, 'checklist:item:remove', {delete: async ({ id }) => {
              await request.deleteNote(id);
              await fetchNote.fetch()
            }}]
        }
      ],
    },
  })
  // Empty list custom classes
  const [emptyValue] = useState({
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
  })

  function handleButtons ({nextCurrentIndex, onClick}) {
    onClick();
    setButtonsIndex(nextCurrentIndex)
  }

  async function handleSubmitFormInput (note, noteTitle) {
    await request.postNote({title: noteTitle});
    await fetchNote.fetch()
  }

  async function handleChangeListNote (item, e) {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      const todoNew = todoToggleComplete(item);
      await request.updateTodo(todoNew);
      await fetchTodo.fetch()
    }
  }

  function handleActionCard (item, actionType) {
    const action = checkList.events.actionsModal.find(item => item.typeName === actionType);
    if (action) {
      action.handler(item, ...action.args)
    }
  }

  function toggleFormInput (e) {
    setDisplayFormInput(!displayFormInput)
  }

  // Render


  const renderTodo = (listTodo) => {
    const {events} = checkList

    if (listTodo.length === 0) return (
      <EmptyValue {...emptyValue}/>
    )
    return (
      <CheckboxList
        todo={listTodo}
        events={events}
      />
    )
  }
  const renderChecklist = () => {
    const noteEmpty = notes.length === 0

    if (noteEmpty) return (
      <EmptyValue
        {...emptyValue}
        classNameWrap={emptyValue.classNameWrapChecklist}
      />
    )
    const checkboxListView = {
      render: renderTodo,
      helper: todoFindByNoteID,
    }
    return (
      <CardList
        list={notes}
        view={checkboxListView}
        action={handleActionCard}
      />
    )
  }
  const showFormInput = displayFormInput
    ?
      <FormInputWrap
        note={null}
        handler={handleSubmitFormInput}/>
    :
    null

  function WithProcessingContent() {
    const loading = () =>
      <div className='text-center'>
        <h4>Loading...</h4>
      </div>

    return (
      <WithProcessing
        process={fetchProcessing}
        Content={ContentProcessing}
        ProcessContent={loading}
      />
    )
  }
  function WithErrorContent() {
    // const loading = () => <div className='text-center'>
    //   <h4>Loading...</h4>
    // </div>
    return <WithProcessing
      process={fetchErrors}
      Content={Content}
      ProcessContent={ErrorView}
    />
  }

  function Content() {
    return (
      <section className="container-lg container-fluid main">
        <Topbar rightContent={buttonsCreate()}/>
        {showFormInput}
        <WithProcessingContent/>
        <ModalActions modal={modal} />
      </section>
    )
  }
  function ContentProcessing() {
    return (
      <div>
        {renderChecklist()}
      </div>
    )
  }
  return (
    <WithErrorContent/>
  )
}
const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Base, mapContextToProps)
