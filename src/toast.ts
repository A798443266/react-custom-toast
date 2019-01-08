import event from './event'
import { ToastOption } from './type'

const defaultOption: ToastOption = {
  id: '',
  message: '',
  type: 'info',
  placement: 'topLeft',
  duration: 2000
}

const open = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    type: 'info',
    ...option,
    message,
  })
}

const error = (message: string = '', option: ToastOption = defaultOption) => {
  event.add({
    ...option,
    message,
    type: 'error'
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
  success,
  error,
  remove
})

export default toast
