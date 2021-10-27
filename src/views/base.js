import React, {useState} from 'react'

import {Button, FormInputWrap} from '../components/ui'
import CardList from '../components/card-list'
import CheckboxList from '../components/checkbox-list'
import EmptyValue from '../components/empty-value'
import { WithModelContext } from '../components/hoc'
import {Topbar} from '../components/layout';


function Base ({ app, history }) {

  const handleChangeListNote = (item, e) => {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      const { checkList } = app;
      const todoNew = checkList.todoNew(item);
      checkList.todoUpdate(todoNew);
    }
  }

  const handleSubmitFormInput = (note, noteTitle) => {
    app.checkList.noteNew({title: noteTitle});
  }

  const handleActionCard = (item, actionType) => {
    console.log(actionType)
    const action = checkList.events.actionsModal.find(item => item.typeName === actionType);
    if (action) {
      action.handler(item, ...action.args)
    }
  }

  const toggleFormInput = e => {
    setDisplayFormInput(!displayFormInput)
  }

  const [buttons, setButtons] = useState({
    all: [
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
    ],
    currentIndex: 0
  })
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

  // Buttons

  const buttonsCreate = () => {
    const {all, currentIndex} = buttons
    return renderButton(all[currentIndex])
  }
  const buttonsUpdate = (value) => {
    const newButtons = Object.assign({...buttons}, {currentIndex: value});
    setButtons(newButtons)
  }

  const handleButton = ({nextCurrentIndex, onClick}) => {
    onClick();
    buttonsUpdate(nextCurrentIndex)

  }

  // Render

  const renderButton = (btn) => {
    const {color, label} = btn

    return (
      <Button
        color={color}
        label={label}
        handler={() => handleButton(btn)}
      />
    )
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
