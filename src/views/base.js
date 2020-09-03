import React, { Component } from 'react'

import { Button, Card, FormInput } from '../components/ui'

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
        valueInput: ''
      },
      events: {
        onChange: this.handleChangeFormInput.bind(this),
        onSubmit: this.handleSubmitFormInput.bind(this)
      }
    }
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

  handleChangeFormInput (e) {
    e.stopPropagation()

    const formInput = this.state.formInput
    formInput.option.valueInput = e.target.value

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

    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary">
          {this.button}
        </div>
        <FormInput
          option={formInput.option}
          events={formInput.events}
        />
        <Card
          header={
            <h3 className='m-0'>Title</h3>
          }
          body={
            <h4>Body</h4>
          }
        ></Card>
      </section>
    )
  }
}

export default Base;
