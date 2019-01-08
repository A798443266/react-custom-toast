import { ToastOption } from './type'

class EventEmiter {
  private queue: ToastOption[] = []
  private trigger: Function = () => {}
  constructor() {
    this.queue = []
  }

  public add(option: ToastOption) {
    setTimeout(() => {
      this.emit(option)
    }, option.delay || 0)
  }

  emit(option: ToastOption) {
    if (!option.id) {
      option.id = Date.now()
    }
    this.queue.push(option)

    this.trigger(this.queue)

    if (option.duration) {
      setTimeout(() => {
        this.remove(option.id)
      }, option.duration)
    }
  }

  remove(toastId: string | number) {
    const index = this.queue.findIndex(({ id }) => id === toastId)
    if (index >= 0) {
      this.queue.splice(index, 1)
      this.trigger(this.queue)
    }
  }

  public on(callback: Function) {
    this.trigger = callback
  }
}

export default new EventEmiter()
