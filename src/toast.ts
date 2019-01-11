import event from './event'
import { ToastOption } from './type'

const defaultOption: ToastOption = {
  id: '',
  message: '',
  type: 'default',
  placement: 'topLeft',
  duration: 2000
}

const open = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    type: 'default',
    ...option,
    message,
  })
}

const info = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    ...option,
    message,
    type: 'info'
  })
}

const error = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    ...option,
    message,
    type: 'error'
  })
}

const warning = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    ...option,
    message,
    type: 'warning'
  })
}

const success = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    ...option,
    message,
    type: 'success'
  })
}

const remove = (id: string|number) => {
  event.remove(id)
}

const toast = Object.assign(open, {
  open,
  info,
  success,
  warning,
  error,
  remove,
})

export default toast
