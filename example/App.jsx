import React, { Component } from 'react'
import './App.styl'
import { Placement } from '../src/type'

import { Toast, ToastContainer } from '../src/index'

interface State {
  placement: Placement;
  delay: number;
  duration: number;
}

class App extends Component<State> {
  state: Readonly<State> = {
    placement: 'topLeft',
    duration: 2000,
    delay: 0
  }
  renderPlacement = () => {
    const handleSelect = (placement) => this.setState({ placement })
    const placements = [
      'topLeft',
      'topRight',
      'topCenter',
      'bottomLeft',
      'bottomRight',
      'bottomCenter'
    ]
    return placements.map((placement) => (
      <Radio
        key={placement}
        value={placement}
        text={placement}
        checked={this.state.placement === placement}
        onChange={handleSelect}
      />
    ))
  }
  render() {
    return (
      <div className='App'>
        <div className='flex-col'>
          <h4>chose placement</h4>
          {this.renderPlacement()}
        </div>
        <div>
          <button className='btn' onClick={this.openToast('')}>
            default toast
          </button>
          <button className='btn info' onClick={this.openToast('info')}>
            info toast
          </button>
          <button className='btn error' onClick={this.openToast('error')}>
            error toast
          </button>
          <button className='btn warning' onClick={this.openToast('warning')}>
            warning toast
          </button>
          <button className='btn success' onClick={this.openToast('success')}>
            success toast
          </button>
        </div>
        <div className='flex-col'>
          <label className='flex-row'>
            持续时间: {this.state.duration}ms
            <input
              type='number'
              defaultValue={this.state.duration / 1000}
              onChange={this.setDuration}
            />
          </label>
          <label className='flex-row'>
            延迟: {this.state.delay}ms
            <input
              type='number'
              defaultValue={this.state.delay / 1000}
              onChange={this.setDelay}
            />
          </label>
        </div>
        <ToastContainer />
      </div>
    )
  }

  openToast = (type: string) => () => {
    const { placement, duration, delay } = this.state
    Toast(`${Date.now()} mmmmmmm`, {
      delay,
      placement,
      type,
      duration
    })
  }

  setDelay = (e: React.SyntheticEvent) => {
    this.setState({ delay: Number(e.target.value) * 1000 })
  }

  setDuration = (e: React.SyntheticEvent) => {
    this.setState({ duration: Number(e.target.value) * 1000 })
  }
}

const MyToast = (props) => {
  return <div className='toast'>{JSON.stringify(props)}</div>
}

const Radio = ({ value, text, checked, onChange }) => {
  const handleChange = () => {
    onChange(value)
  }
  return (
    <label className='flex-row'>
      <input
        onChange={handleChange}
        type='radio'
        value={value}
        checked={checked}
      />
      {text}
    </label>
  )
}

export default App
