import React, { Component } from 'react'

import { Button, FormInput } from '../components/ui'
import CardList from '../components/card-list'
import CheckboxList from '../components/checkbox-list'


class Base extends Component {

  todoStartId = 100

  handleChangeListNote = (item, e) => {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      this.setState((oldState) => {
        const listTodo = oldState.lists.todo
        const indexItem = listTodo.findIndex(todo => todo.id === item.id)

        const newTodo = this.newTodo(item.noteId, item.id, 'New todo', !item.executeFlag)

        const startAllTodo = listTodo.slice(0, indexItem)
        const endAllTodo = listTodo.slice(indexItem + 1)

        const allTodo = [...startAllTodo, newTodo, ...endAllTodo]

        return {
          ...oldState,
          lists: {
            ...oldState.lists,
            todo: allTodo
          }
        }
      })
      // e.target.checked
      console.log(item)
    }
  }

  handleChangeFormInput = (e) => {
    e.stopPropagation()

    const formInput = { ...this.state.formInput }
    formInput.option.valueInput = e.target.value

    this.setState({formInput})
  }

  handleSubmitFormInput = (e) => {
    e.preventDefault()
    e.stopPropagation()

    console.log(this.state.formInput)
  }

  state = {
    buttons: {
      all: [
        {to: '/note', label: 'Add', color: 'success', nextCurrentIndex: 1},
        {to: '/', label: 'Cancel', color: 'primary', nextCurrentIndex: 0}
      ],
      currentIndex: 0
    },
    formInput: {
      option: {
        titleBtn: 'Add',
        valueInput: ''
      },
      events: {
        onChange: this.handleChangeFormInput,
        onSubmit: this.handleSubmitFormInput
      }
    },
    lists: {
      events: {
        self: this,
        onChangeCheckbox: this.handleChangeListNote
      },
      note: [
        {
          title: 'First note',
          id: 1
        },
        {
          title: 'Second note',
          id: 2
        }
      ],
      todo: [
        this.newTodo(1, 1,'Checkbox First notes'),
        this.newTodo(1, 2,'Checkbox Second notes'),
        this.newTodo(1, 3,'Checkbox Three notes'),
        this.newTodo(2, 4,'Checkbox First notes 2')
      ]
    },
  }

  get button () {
    const buttons = this.state.buttons
    const { all, currentIndex } = buttons

    return this.renderButton(all[currentIndex])
  }

  set button (value) {
    const oldButtons = this.state.buttons
    const newButtons = Object.assign({ ...oldButtons }, { currentIndex: value })

    this.setState({ buttons: newButtons })
  }

  renderButton (btn) {
    const { color, label } = btn

    return (
      <Button
        color={color}
        label={label}
        handler={this.handleButton.bind(this, btn)}
      />
    )
  }

  handleButton ({ nextCurrentIndex }) {
    this.button = nextCurrentIndex
  }

  newTodo (noteId, id = ++this.todoStartId, title, executeFlag = false) {
    return {
      executeFlag,
      noteId,
      id,
      title
    }
  }

  findByNoteIdTodo = (id) => {
    const { todo } = this.state.lists
    return todo.filter(item => item.noteId === id)
  }

  renderTodo (listTodo) {
    const { events } = this.state.lists
    return (
      <CheckboxList
        todo={listTodo}
        events={events}
      />
    )
  }

  render() {
    const { formInput, lists } = this.state
    const checkboxListView = {
      render: this.renderTodo.bind(this),
      helper: this.findByNoteIdTodo.bind(this)
    }

    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary">
          {this.button}
        </div>
        <FormInput
          option={formInput.option}
          events={formInput.events}
        />
        <CardList
          list={ lists.note }
          view={ checkboxListView }
        />
      </section>
    )
  }
}

export default Base;
