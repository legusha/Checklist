import React, { Component } from 'react'

import { Button, FormInput } from '../components/ui'
import CardList from '../components/card-list'
import CheckboxList from '../components/checkbox-list'
import { WithModelContext } from '../components/hoc'


class Base extends Component {

  handleChangeListNote = (item, e) => {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      // const newTodo = this.props.checkList.newTodo({ ...item, executeFlag: !item.executeFlag })
      console.log(item)
      const newTodo = this.props.checkList.api.newTodo(item)
      this.props.checkList.api.updateTodo(newTodo)
      console.log(this.props.checkList.state.todo)
    }
  }

  handleChangeFormInput = e => {
    e.stopPropagation()

    const formInput = { ...this.state.formInput }
    formInput.input.value = e.target.value

    this.setState({formInput})
  }

  handleSubmitFormInput = e => {
    e.preventDefault()
    e.stopPropagation()

    // this.state.formInput.input.value
    const newNote = this.props.checkList.api.newNote({title: this.state.formInput.input.value})
    this.setState((oldState) => {
      return {
        ...oldState,
        checkList: {
          ...oldState.checkList,
          note: [newNote, ...oldState.checkList.note]
        }
      }
    })
  }

  handleActionCard = (item, actionType) => {
    const action = this.state.checkList.events.actionsModal.find(item => item.typeName === actionType)
    if (action) {
      action.handler()
    }
  }

  toggleFormInput = e => {
    const newState = oldState => {
      const formInput = { ...oldState.formInput, show: !oldState.formInput.show }
      return {
        ...oldState,
        formInput
      }
    }
    this.setState(newState)
  }

  state = {
    model: null,
    buttons: {
      all: [
        {to: '/note', label: 'Add', color: 'success', nextCurrentIndex: 1, onClick: this.toggleFormInput},
        {to: '/', label: 'Cancel', color: 'primary', nextCurrentIndex: 0, onClick: this.toggleFormInput}
      ],
      currentIndex: 0
    },
    formInput: {
      btn: {
        title: 'Add'
      },
      input: {
        value: ''
      },
      show: false,
      events: {
        onChange: this.handleChangeFormInput,
        onSubmit: this.handleSubmitFormInput
      },
    },
    checkList: {
      events: {
        self: this,
        onChangeCheckbox: this.handleChangeListNote,
        onActionCard: this.handleActionCard,
        actionsModal: [
          {
            typeName: 'edit',
            handler: () => {},
          },
          {
            typeName: 'delete',
            handler: this.props.modal.makeShow,
          }
        ],
      },
      note: this.props.checkList.state.note,
      todo: this.props.checkList.state.todo,
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

  handleButton ({ nextCurrentIndex, onClick }) {
    onClick()
    this.button = nextCurrentIndex

  }

  findByNoteIdTodo = (id) => {
    const { todo } = this.state.checkList
    return todo.filter(item => item.noteId === id)
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

  renderTodo (listTodo) {
    const { events } = this.state.checkList

    return (
      <CheckboxList
        todo={listTodo}
        events={events}
      />
    )
  }

  render () {
    const { formInput, checkList } = this.state
    const checkboxListView = {
      render: this.renderTodo.bind(this),
      helper: this.findByNoteIdTodo.bind(this),
    }
    const showFormInput = formInput.show ? <FormInput {...formInput} /> : null

    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary d-flex align-items-center justify-content-between">
          <div>
            <h3 className={'text-muted'}>Welcome to Checklist</h3>
          </div>
          <div>
            {this.button}
          </div>
        </div>
        {showFormInput}
        <CardList
          list={ checkList.note }
          view={ checkboxListView }
          action={this.handleActionCard}
        />
      </section>
    )
  }
}

const mapContextToProps = ({ checkList, modal, checkListAPI }) => {
  return {
    checkList,
    checkListAPI,
    modal
  }
}

export default WithModelContext(Base, mapContextToProps)
