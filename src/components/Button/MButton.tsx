import { ReactNode } from 'react'

type IProps = {
  type?: 'button' | 'submit'
  disabled?: boolean
  className?: string
  children: ReactNode
}

export function MButton({ type = 'button', disabled, children }: IProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      className="inline h-[35px] justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
    >
      {children}
    </button>
  )
}
