import React, {useState} from 'react'

import { FormInputWrap } from '../../components/ui'
import CardList from '../../components/card-list'
import CheckboxList from '../../components/checkbox-list'
import EmptyValue from '../../components/empty-value'
import { WithModelContext } from '../../components/hoc'
import {Topbar} from '../../components/layout';
import useButtonsIndex from './use-buttons-index'


function Base ({ app, history }) {
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
  const buttonsHandler = ({nextCurrentIndex, onClick}) => {
    onClick();
    setButtonsIndex(nextCurrentIndex)
  }
  const [setButtonsIndex, buttonsCreate] = useButtonsIndex(buttonsVariant, buttonsHandler)
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
    const {todo} = app.checkList
    return todo.filter(item => item.noteId === id)
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
    const note = app.checkList.note
    const noteEmpty = note.length === 0

    if (noteEmpty) return (
      <EmptyValue {...emptyValue} classNameWrap={emptyValue.classNameWrapChecklist}/>
    )
    const checkboxListView = {
      render: renderTodo,
      helper: findByNoteIdTodo,
    }
    return (
      <CardList
        list={app.checkList.note}
        view={checkboxListView}
        action={handleActionCard}
      />
    )
  }

  const showFormInput = displayFormInput ? <FormInputWrap note={null} handler={handleSubmitFormInput}/> : null
  return (
    <section className="container-lg container-fluid main">
      <Topbar rightContent={buttonsCreate()}/>
      {showFormInput}
      {renderChecklist()}
    </section>
  )
}
const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Base, mapContextToProps)
