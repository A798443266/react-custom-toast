import React, { Component } from 'react'
import { Placement } from '../src/type'
import { Toast, ToastContainer } from '../src/index'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'

import 'highlight.js/styles/github.css'
import './App.styl'

interface State {
  code: string
  text: string
  placement: Placement;
  delay: number;
  duration: number;
  anim: string;
}

class App extends Component<State> {
  state: Readonly<State> = {
    code: '',
    text: 'hello,world!',
    anim: 'slideX',
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
  renderAnim = () => {
    const handleSelect = (anim) => this.setState({ anim })
    const anims = ['slideX', 'slideY']
    return anims.map((anim) => (
      <Radio
        key={anim}
        value={anim}
        text={anim}
        checked={this.state.anim === anim}
        onChange={handleSelect}
      />
    ))
  }
  componentDidMount() {
    this.bindHighlight()
    this.setState({
      code: this.getCode()
    })
  }
  componentDidUpdate(_, preStates) {
    this.bindHighlight()
    const code = this.getCode()
    if (preStates.code !== code) {
      this.setState({ code })
    }
  }
  render() {
    return (
      <div className='App'>
        <div className='flex-col'>
          <input type="text" defaultValue={this.state.text} onChange={this.updateText}/>
        </div>
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
        <div className='flex-col'>
          <h4>chose animate</h4>
          {this.renderAnim()}
        </div>
        <div>
          <h4>code: </h4>
          <ReactMarkdown source={this.state.code} />
        </div>
        <ToastContainer />
      </div>
    )
  }

  updateText = (event) => {
    const text = event.target.value
    this.setState({
      text
    })
  }

  getCode() {
    const { placement, duration, delay, anim, text } = this.state
    const options = {
      animateName: anim,
      delay,
      placement,
      duration
    }
    const optionStr = Object.entries(options).reduce((code, [key, value]) => {
      return `${code}  ${key}: '${value}'\n`
    }, '')
    return `\`\`\` js\nToast.info('${this.state.text}', {\n${optionStr}})\n\`\`\``
  }

  openToast = (type: string) => () => {
    const { placement, duration, delay, anim } = this.state
    Toast(this.state.text, {
      animateName: anim,
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

  bindHighlight() {
    const elems = document.querySelectorAll('pre');
    Array.prototype.forEach.call(elems, elem => {
      hljs.highlightBlock(elem);
    })
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
