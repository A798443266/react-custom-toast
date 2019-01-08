import React from 'react'
import { ToastOption } from './type'
import toast from './toast'

import './style.styl'

const ToastComponent: React.FunctionComponent<ToastOption> = ({
  id,
  type,
  message
}) => {
  const handleClose = () => { toast.remove(id) }
  return (
    <div className={`toast-message ${type}`}>
      <span>{message}</span>
      <button onClick={handleClose}>get</button>
    </div>
  )
}

export default ToastComponent
