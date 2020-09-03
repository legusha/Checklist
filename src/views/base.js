import React, { Component } from 'react'

import { Button, FormInput } from '../components/ui'

class Base extends Component {
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
        value: ''
      },
      onChange: this.handleChangeFormInput,
      onSubmit: this.handleSubmitFormInput
    }
  }
  get button () {
    const buttons = this.state.buttons
    const currentIndex = buttons.currentIndex

    return this.renderButton(buttons.all[currentIndex])
  }
  set button (value) {
    const oldButtons = this.state.buttons
    const newButtons = Object.assign({ ...oldButtons }, { currentIndex: value })

    this.setState({ buttons: newButtons })
  }

  renderButton (btn) {
    return (
      <Button
        color={btn.color}
        label={btn.label}
        handler={this.handleButton.bind(this, btn)}
      />
    )
  }

  handleButton ({ nextCurrentIndex }) {
    this.button = nextCurrentIndex
  }

  handleFormInput (handler, e) {
    handler(e)
  }

  handleChangeFormInput (e) {
    e.stopPropagation()

    const formInput = this.state.formInput
    formInput.option.value = e.target.value
    this.setState({formInput})
  }

  handleSubmitFormInput (e) {
    e.preventDefault()
    e.stopPropagation()

    console.log(this.state.formInput)
  }

  render() {
    const state = this.state
    const formInput = state.formInput

    const handleChangeFormInput = this.handleFormInput.bind(this, formInput.onChange.bind(this))
    const handleSubmitFormInput = this.handleFormInput.bind(this, formInput.onSubmit.bind(this))

    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary">
          {this.button}
        </div>
        <FormInput
          option={formInput.option}
          onChange={handleChangeFormInput}
          onSubmit={handleSubmitFormInput}
        />
      </section>
    )
  }
}

export default Base;
