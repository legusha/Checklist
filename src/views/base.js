import React, { Component } from 'react'

import { Button, FormInput } from '../components/ui'
import CardList from '../components/card-list'
import CheckboxList from '../components/checkbox-list'
import EmptyValue from '../components/empty-value'
import { WithModelContext } from '../components/hoc'
import {Topbar} from '../components/layout';


class Base extends Component {

  handleChangeListNote = (item, e) => {
    const classNameCheckbox = 'checkbox-wrap'
    const isCheckbox = e.target.parentNode.classList.contains(classNameCheckbox)
    if (isCheckbox) {
      const { checkList } = this.props.app;
      const todoNew = checkList.todoNew(item);
      checkList.todoUpdate(todoNew);
    }
  }

  handleChangeFormInput = e => {
    e.stopPropagation();

    const formInput = { ...this.state.formInput };
    formInput.input.value = e.target.value;

    this.setState({formInput})
  }

  handleSubmitFormInput = e => {
    e.preventDefault();
    e.stopPropagation();

    const formInput = { ...this.state.formInput };
    this.props.app.checkList.noteNew({title: formInput.input.value});
    formInput.input.value = '';

    this.setState({formInput})
  }

  handleActionCard = (item, actionType) => {
    const action = this.state.checkList.events.actionsModal.find(item => item.typeName === actionType);
    if (action) {
      action.handler(item, ...action.args)
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
    buttons: {
      all: [
        {
          to: '/note',
          label: 'Add',
          color: 'success',
          nextCurrentIndex: 1,
          onClick: this.toggleFormInput
        },
        {
          to: '/',
          label: 'Cancel',
          color: 'primary',
          nextCurrentIndex: 0,
          onClick: this.toggleFormInput
        }
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
            handler: this.props.app.modal.updateWithItem,
            args: [true, 'checklist:item:edit', { edit: ({ id }) => {
                this.props.history.push(`/note/${id}`)
              } }]
          },
          {
            typeName: 'delete',
            handler: this.props.app.modal.updateWithItem,
            args: [true, 'checklist:item:remove', { delete: this.props.app.checkList.noteDelete }]
          }
        ],
      },
    },
    emptyValue: {
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
  }

  get button () {
    const buttons = this.state.buttons
    const { all, currentIndex } = buttons

    return this.renderButton(all[currentIndex])
  }

  set button (value) {
    const oldButtons = this.state.buttons;
    const newButtons = Object.assign({ ...oldButtons }, { currentIndex: value });

    this.setState({ buttons: newButtons })
  }

  handleButton ({ nextCurrentIndex, onClick }) {
    onClick();
    this.button = nextCurrentIndex

  }

  findByNoteIdTodo = (id) => {
    const { todo } = this.props.app.checkList
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

    if (listTodo.length === 0) return (
      <EmptyValue {...this.state.emptyValue}/>
    )
    return (
      <CheckboxList
        todo={listTodo}
        events={events}
      />
    )
  }
  renderChecklist() {
    const note = this.props.app.checkList.note
    const noteEmpty = note.length === 0

    if (noteEmpty) return (
      <EmptyValue {...this.state.emptyValue} classNameWrap={this.state.emptyValue.classNameWrapChecklist}/>
    )
    const checkboxListView = {
      render: this.renderTodo.bind(this),
      helper: this.findByNoteIdTodo.bind(this),
    }
    return (
      <CardList
        list={ this.props.app.checkList.note }
        view={ checkboxListView }
        action={this.handleActionCard}
      />
    )
  }

  render () {
    const { formInput } = this.state
    const showFormInput = formInput.show ? <FormInput {...formInput} /> : null

    return (
      <section className="container-lg container-fluid main">
        <Topbar rightContent={this.button}/>
        {showFormInput}
        {this.renderChecklist()}
      </section>
    )
  }
}

const mapContextToProps = ({ app }) => {
  return {
    app,
  }
}

export default WithModelContext(Base, mapContextToProps)
