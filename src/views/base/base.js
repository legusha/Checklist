import React, {useEffect, useState} from 'react'

import { FormInputWrap } from '../../components/ui'
import CardList from '../../components/card-list'
import CheckboxList from '../../components/checkbox-list'
import EmptyValue from '../../components/empty-value'
import { WithModelContext } from '../../components/hoc'
import {Topbar} from '../../components/layout';
import { WithProcessing } from '~/components/hoc'
import useButtonsIndex from './use-buttons-index'
import { useFetching, context } from '~/hooks';
import request from '~/services/request';

const { useContextNote: useNote, useContextTodoList: useTodo } = context;

function Base ({ app, history }) {
  const [fetchNote, processing, error] = useFetching(request.getNote)
  const [fetchTodo, processingTodo, errorTodo] = useFetching(request.getTodo)
  const fetchProcessing = [processing, processingTodo]
  const fetchErrors = [error, errorTodo]

  const [notes, setNotes] = useNote()
  const [todos, setTodos] = useTodo()

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
  const [checkList] = useState({
    events: {
      self: this,
      onChangeCheckbox: handleChangeListNote,
      onActionCard: handleActionCard,
      actionsModal: [
        {
          typeName: 'edit',
          handler: app.modal.updateWithItem,
          args: [true, 'checklist:item:edit', {
            edit: ({id}) => {
              history.push(`/note/${id}`)
            }
          }]
        },
        {
          typeName: 'delete',
          handler: app.modal.updateWithItem,
          args: [true, 'checklist:item:remove', {delete: app.checkList.noteDelete}]
        }
      ],
    },
  })
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

  const findByNoteIdTodo = (id) => {
    return todos.filter(item => item.noteId === id)
  }
  function handleButtons ({nextCurrentIndex, onClick}) {
    onClick();
    setButtonsIndex(nextCurrentIndex)
  }

  function handleSubmitFormInput (note, noteTitle) {
    app.checkList.noteNew({title: noteTitle});
  }

  function handleChangeListNote (item, e) {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      const { checkList } = app;
      const todoNew = checkList.todoNew(item);
      checkList.todoUpdate(todoNew);
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

  function WithProcessingContent() {
    const loading = () => <section className="container-lg container-fluid main">
      <div className='text-center'>
        <h4>Loading...</h4>
      </div>
    </section>
    return <WithProcessing
      process={fetchProcessing}
      Content={Content}
      ProcessContent={loading}
    />
  }

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
      <EmptyValue {...emptyValue} classNameWrap={emptyValue.classNameWrapChecklist}/>
    )
    const checkboxListView = {
      render: renderTodo,
      helper: findByNoteIdTodo,
    }
    return (
      <CardList
        list={notes}
        view={checkboxListView}
        action={handleActionCard}
      />
    )
  }

  useEffect(() => {
    const handler = async () => {
      const listNote = await fetchNote()
      const listTodo = await fetchTodo()

      if (!error && !errorTodo) {
        setNotes(listNote)
        setTodos(listTodo)
      }
    }
    handler()
  }, [])

  const showFormInput = displayFormInput ? <FormInputWrap note={null} handler={handleSubmitFormInput}/> : null

  function Content() {
    return (
      <section className="container-lg container-fluid main">
        <Topbar rightContent={buttonsCreate()}/>
        {showFormInput}
        {renderChecklist()}
      </section>
    )
  }
  return (
    <WithProcessingContent/>
  )
}
const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Base, mapContextToProps)
