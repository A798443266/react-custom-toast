export interface ToastOption {
  id: string | number
  message: string
  placement: Placement
  type?: ToastType
  duration?: number
  delay?: number
  animateDuration?: number
  animateName?: Animate
}

export type AnimDirection = {
  [key in Animate]?: any
}

type Animate = 'slideX' | 'slideY'
type ToastType = 'default' | 'info' | 'success' | 'error' | 'warning'
export type Placement = 'topLeft' | 'topRight' | 'topCenter' | 'bottomLeft' | 'bottomRight' | 'bottomCenter'