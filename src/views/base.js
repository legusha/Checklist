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
      this.setState((oldState) => {
        const listTodo = oldState.checkList.todo
        const indexItem = listTodo.findIndex(todo => todo.id === item.id)

        const newTodo = this.props.checkList.newTodo({ ...item, executeFlag: !item.executeFlag })

        const startAllTodo = listTodo.slice(0, indexItem)
        const endAllTodo = listTodo.slice(indexItem + 1)

        const allTodo = [...startAllTodo, newTodo, ...endAllTodo]

        return {
          ...oldState,
          checkList: {
            ...oldState.checkList,
            todo: allTodo
          }
        }
      })
      // e.target.checked
      console.log(item)
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
    const title = this.state.formInput.input.value
    if (title) {
      const newNote = this.props.checkList.newNote({
        title
      })

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
  }

  toggleFormInput = e => {
    const newState = oldState => {
      const formInput = {
        ...oldState.formInput,
        show: !oldState.formInput.show
      }
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
        onChangeCheckbox: this.handleChangeListNote
      },
      note: [
        this.props.checkList.newNote({title: 'Note #1'}),
        this.props.checkList.newNote({title: 'Note #2'}),
        this.props.checkList.newNote({title: 'Note #3'}),
        this.props.checkList.newNote({title: 'Note #4'}),
      ],
      todo: [
        this.props.checkList.newTodo({noteId: 105, title: 'Checkbox First notes'}),
        this.props.checkList.newTodo({noteId: 105, title: 'Checkbox Second notes'}),
        this.props.checkList.newTodo({noteId: 106, title: 'Checkbox Three notes'}),
        this.props.checkList.newTodo({noteId: 108, title: 'Checkbox First notes 2'}),
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
      helper: this.findByNoteIdTodo.bind(this)
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
        />
      </section>
    )
  }
}

const mapContextToProps = ({ checkList }) => {
  return {
    checkList
  }
}

export default WithModelContext(Base, mapContextToProps)
