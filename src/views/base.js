import React, { Component } from 'react'

import { Button, FormInput } from '../components/ui'
import CardList from '../components/card-list'
import CheckboxList from '../components/checkbox-list'
import { WithModelContext } from '../components/hoc'


class Base extends Component {

  // note = new this.model.Note(() => this.state)
  // newNote = this.model.newItem

  newNote = (props) => {
    const { id = ++this.startIdNote } = props
    console.log(id)
    return {
      ...props,
      id
    }
  }

  handleChangeListNote = (item, e) => {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      this.setState((oldState) => {
        const listTodo = oldState.checkList.todo
        const indexItem = listTodo.findIndex(todo => todo.id === item.id)

        const newTodo = this.newTodo({ ...item, executeFlag: !item.executeFlag })

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
    const newNote = this.newNote({title: this.state.formInput.input.value})
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

  startIdNote = 0
  startIdTodo = 100
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
        this.newNote({id: 1, title: 'Note #1'}),
        this.newNote({id: 2, title: 'Note #2'}),
        this.newNote({id: 3, title: 'Note #3'}),
      ],
      todo: [
        this.newTodo({noteId: 1, id: 1, title: 'Checkbox First notes'}),
        this.newTodo({noteId: 1, id: 2, title: 'Checkbox Second notes'}),
        this.newTodo({noteId: 1, id: 3, title: 'Checkbox Three notes'}),
        this.newTodo({noteId: 2, id: 4, title: 'Checkbox First notes 2'}),
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
  // newNote (props) {
  //   const note = this.state?.checkList?.note
  //   const lastItem  = note ? note[note?.length - 1]?.id : null
  //   const isDd =  lastItem || this.startIdNote
  //   const { id = (isDd + 1) } = props
  //   console.log(id)
  //   return {
  //     ...props,
  //     id
  //   }
  // }

  newTodo (props) {
    const { id = ++this.startIdTodo, executeFlag = false } = props
    return {
      ...props,
      id,
      executeFlag
    }
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

  render() {
    const { formInput, checkList } = this.state
    const checkboxListView = {
      render: this.renderTodo.bind(this),
      helper: this.findByNoteIdTodo.bind(this)
    }
    const showFormInput = formInput.show ? <FormInput {...formInput} /> : null

    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary">
          {this.button}
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
const mapMethodsToProps = (modelContext) => {
  console.log(modelContext)
  return {
    note: modelContext,
  }
};

export default WithModelContext(Base, mapMethodsToProps)
