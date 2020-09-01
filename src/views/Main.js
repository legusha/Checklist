import React, { Component } from 'react'
import Button from '../components/UI/Button'

class Main extends Component {
  state = {
    buttons: {
      all: [
        {to: '/note', label: 'Add', color: 'success', nextCurrent: 1},
        {to: '/', label: 'Cancel', color: 'primary', nextCurrent: 0}
      ],
      current: 0
    }
  }
  renderButton () {
    const btn = this.button

    return (
      <Button
        color={btn.color}
        label={btn.label}
        handler={this.handleButton.bind(this, btn)}
      />
    )
  }
  get button () {
    const button = this.state.buttons
    const current = button.current

    return button.all[current]
  }
  set button (value) {
    const oldButtons = this.state.buttons
    const newButtons = Object.assign({...oldButtons}, {current: value})

    this.setState({ buttons: newButtons })
  }

  handleButton ({ nextCurrent }) {
    this.button = nextCurrent
  }
  render() {
    return (
      <section className="container main">
        <div className="main-action text-left mb-4 p-4 border-secondary bg-secondary">
          {this.renderButton()}
        </div>
      </section>
    )
  }

}

// Main.propTypes = {
//   link: React.PropTypes.object,
// }

export default Main;
