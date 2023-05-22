import { toast } from 'react-toastify'

export const useToastr = () => {
  const notifySuccess = (message: string) => {
    toast(message, {
      type: 'success',
      theme: 'colored'
    })
  }

  const notifyError = (message: string) => {
    toast(message, {
      type: 'error',
      theme: 'colored'
    })
  }

  return { notifySuccess, notifyError }
}
