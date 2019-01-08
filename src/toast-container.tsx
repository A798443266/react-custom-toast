import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import event from './event'
import { Placement, ToastOption, AnimDirection } from './type'

import './style.styl'
import ToastComponent from './toast-component'
import { SlideY, SlideX, Default } from './anim'

interface Props {
  component?: React.FunctionComponent<any>
  clickClose?: boolean
}
interface State {
  placement: Placement
  toasts: any[]
}
type PlacementToasts = { [index in Placement]?: ToastOption[] }
export default class ToastContainer extends React.Component<Props, State> {
  state: Readonly<State> = {
    placement: 'topLeft',
    toasts: []
  }
  componentDidMount() {
    event.on((toasts: any) => {
      this.setState({ toasts })
    })
  }
  render() {
    return <div className='toast-container'>{this.renderPlacement()}</div>
  }
  getPlacementToasts(): PlacementToasts {
    const placements = [
      'topLeft',
      'topRight',
      'topCenter',
      'bottomLeft',
      'bottomRight',
      'bottomCenter'
    ]
    const result: PlacementToasts = placements.reduce((obj: any, placement) => {
      obj[placement as Placement] = []
      return obj
    }, {})
    this.state.toasts.forEach((toast) => {
      const placement: Placement = toast.placement
      result[placement]!.push(toast)
    })
    return result
  }
  renderPlacement() {
    const placementToasts: PlacementToasts = this.getPlacementToasts()
    return Object.keys(placementToasts).map((placement) => {
      return (
        <TransitionGroup
          className={`toast-wrapper ${placement}`}
          key={placement}
        >
          {this.renderToasts(
            placementToasts[placement as Placement] as ToastOption[],
            placement as Placement
          )}
        </TransitionGroup>
      )
    })
  }
  renderToasts(toasts: ToastOption[], placement: Placement) {
    const Component = this.props.component || ToastComponent
    if (placement.includes('top')) {
      toasts.reverse()
    }
    return toasts.map((toast) => {
      const anim = this.getAnimateClass(toast)
      return (
        <CSSTransition
          key={toast.id}
          onEnter={anim.onEnter}
          onEntering={anim.onEntering}
          onExit={anim.onExit}
          onExiting={anim.onExiting}
          timeout={anim.duration}
          classNames='none'
          onClick={this.handleClick(toast)}
        >
          <div>
            <Component {...toast} />
          </div>
        </CSSTransition>
      )
    })
  }
  handleClick = (toast: ToastOption) => () => {
    if (this.props.clickClose) {
      event.remove(toast.id)
    }
  }

  getAnimateClass(toast: ToastOption) {
    const animates: AnimDirection = {
      slideX: SlideX,
      slideY: SlideY
    }
    const animInstance = animates[toast.animateName!] || SlideX
    return new animInstance(toast.placement, toast.animateDuration)
  }
}
