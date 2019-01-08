import { Placement } from './type'

class Anim {
  duration: number = 300
  placement: Placement = 'topLeft'
  constructor(placement: Placement, duration?: number) {
    if (duration) {
      this.duration = duration
    }
    this.placement = placement
  }

  get transition() {
    return `all ${this.duration}ms ease`
  }

  calcPx(...args: Array<string | null>) {
    return args.reduce((sum, val) => {
      return sum + (val ? Number(val.replace('px', '')) : 0)
    }, 0)
  }

  hasPlacement(v: string) {
    return this.placement.toLocaleLowerCase().includes(v.toLocaleLowerCase())
  }

  getStyle(node: HTMLElement) {
    return window.getComputedStyle(node.children[0], null)
  }

  setNodeHeight(node: HTMLElement) {
    const { height, marginTop, marginBottom } = this.getStyle(node)
    const currentHeight = this.calcPx(height, marginTop, marginBottom)
    node.dataset.height = `${currentHeight}`
    return currentHeight
  }
  setNodeWidth(node: HTMLElement) {
    const { width, marginLeft, marginRight } = this.getStyle(node)
    const currentWidth = this.calcPx(width, marginLeft, marginRight)
    node.dataset.width = String(currentWidth)
    return currentWidth
  }
}

export class Default extends Anim {
  onEnter = () => {}
  onEntering = () => {}
  onExit = () => {}
  onExiting = () => {}
}
 
export class SlideY extends Anim {
  onEnter = (node: HTMLElement) => {
    const height = this.setNodeHeight(node)
    const subtract = this.hasPlacement('top') ? '-' : ''

    node.style.transform = `translateY(${subtract}${height + 60}px)`
    node.style.height = '0'
    node.style.overflow = 'hidden'
  }

  onEntering = (node: HTMLElement) => {
    const height = Number(node.dataset.height) || 0
    node.style.transition = this.transition
    node.style.transform = 'translateY(0)'
    node.style.height = `${height}px`
    node.style.overflow = 'auto'
  }

  onExit = (node: HTMLElement) => {
    const height = Number(node.dataset.height) || 0
    node.style.overflow = 'hidden'
    node.style.height = `${height}px`
  }
  onExiting = (node: HTMLElement) => {
    node.style.transition = this.transition
    node.style.height = '0'
  }
}

export class SlideX extends Anim {
  onEnter = (node: HTMLElement) => {
    if (!this.hasPlacement('center')) {
      const subtract = this.hasPlacement('left') ? '-' : ''
      const width = this.setNodeWidth(node)
      node.style.transform = `translateX(${subtract}${width}px)`
    }
  }
  onEntering = (node: HTMLElement) => {
    if (!this.hasPlacement('center')) {
      node.style.transition = this.transition
      node.style.transform = 'translateX(0)'
    }
  }
  onExit = (node: HTMLElement) => {
    node.style.transform = 'translateX(0)'
  }
  onExiting = (node: HTMLElement) => {
    if (!this.hasPlacement('center')) {
      const width: number= Number(node.dataset.width) || 0
      const subtract = this.hasPlacement('left') ? '-' : ''
      node.style.transition = this.transition
      node.style.transform = `translateX(${subtract}${width}px)`
    }
  }
}
