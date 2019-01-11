import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import hljs from 'highlight.js'

import Nav from './container/nav'

import { Placement } from '../src/type'
import { Toast, ToastContainer } from '../src/index'

import 'highlight.js/styles/github.css'
import './App.styl'

class App extends Component {
  state = {
    type: 'default',
    text: 'hello,world!',
    anim: 'slideY',
    placement: 'topLeft',
    duration: 2000,
    animDuration: 300,
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
  renderToastMethods = () => {
    const handleSelect = (type) => this.setState({ type })
    const methods = ['default', 'info', 'success', 'warning', 'error']
    return methods.map((m) => (
      <Radio
        key={m}
        value={m}
        text={m}
        checked={this.state.type === m}
        onChange={handleSelect}
      />
    ))
  }
  componentDidMount() {
    this.bindHighlight()
  }
  componentDidUpdate(_, preStates) {
    this.bindHighlight()
  }
  render() {
    return (
      <div className='container'>
        <Nav />
        <div className='title'>
          <h1>⚠️ react-custom-toast (提示)</h1>
          <span>基于 react 的提示组件。支持自定义提示样式及丰富的配置</span>
        </div>
        <div className='content'>
          <h4>配置项</h4>
          <div className='form-item'>
            <span>文本:</span>
            <input
              type='text'
              defaultValue={this.state.text}
              onChange={this.updateText}
            />
          </div>
          <div className='form-item'>
            <span>选择方向:</span>
            <div className='flex-row'>{this.renderPlacement()}</div>
          </div>
          <div className='form-item'>
            <span>持续时间: {this.state.duration}ms</span>
            <input
              type='number'
              defaultValue={this.state.duration / 1000}
              onChange={this.updateState('duration')}
            />
          </div>
          <div className='form-item'>
            <span>延迟: {this.state.delay}ms</span>
            <input
              type='number'
              defaultValue={this.state.delay / 1000}
              onChange={this.updateState('delay')}
            />
          </div>
          <div className='form-item'>
            <span>选择动画:</span>
            <div className='flex-row'>{this.renderAnim()}</div>
          </div>
          <div className='form-item'>
            <span>动画持续时间: {this.state.animDuration}ms</span>
            <input
              type='number'
              defaultValue={this.state.animDuration / 1000}
              onChange={this.updateState('animDuration')}
            />
          </div>
          <div className='form-item'>
            <span>选择提示类型: </span>
            <div className='flex-row'>{this.renderToastMethods()}</div>
          </div>
          <div className='flex-center'>
            <button
              onClick={this.openToast}
              className={`btn btn-toast ${this.state.type}`}
            >
              显示提示
            </button>
          </div>
          <h4>代码</h4>
          <ReactMarkdown key={this.code} source={this.code} />
        </div>
        <ToastContainer />
      </div>
    )
  }

  get code() {
    const { placement, duration, delay, anim, text, type, animDuration } = this.state
    const options = {
      animateName: anim,
      animateDuration: animDuration,
      delay,
      placement,
      duration
    }
    const currentType = type === 'default' ? 'open' : type
    
    const optionStr = Object.entries(options).reduce((code, [key, value]) => {
      const currentValue = typeof value === 'number' ? value : `'${value}'`
      return `${code}  ${key}: ${currentValue}\n`
    }, '')
    return `\`\`\` js\nToast.${currentType}('${
      this.state.text
    }', {\n${optionStr}})\n\`\`\``
  }

  openToast = () => {
    const { placement, duration, delay, anim, type, animDuration, text } = this.state
    const currentType = type === 'default' ? 'open' : type
    // Toast(this.state.text, {
    //   animateName: anim,
    //   animateDuration: animDuration,
    //   delay,
    //   placement,
    //   type,
    //   duration
    // })
    console.log(Toast[currentType], currentType)
    const fn = Toast[currentType]
    if (fn) {
      fn(text, {
        animateName: anim,
        animateDuration: animDuration,
        delay,
        placement,
        duration
      })
    }
  }

  updateText = (event) => {
    const text = event.target.value
    this.setState({ text })
  }

  updateState = (field) => (e) => {
    this.setState({ [field]: Number(e.target.value) * 1000 })
  }

  bindHighlight() {
    const elems = document.querySelectorAll('pre')
    Array.prototype.forEach.call(elems, (elem) => {
      hljs.highlightBlock(elem)
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
    <label className='flex-row radio'>
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
