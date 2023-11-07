'use client'

import {Toast, ToastClose, ToastDescription, toastProvider, ToastTitle, ToastViewport} from './Toast'
import {useToast} from '../../hooks/use-toast'
import { ToastProvider } from '@radix-ui/react-toast'

export const Toaster = () => {
	const {toasts} = useToast()

	return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, ...props }) => {
        return (
          <Toast key={id} {...props}>
            <div className='grid gap-1'>
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}