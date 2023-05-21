import { ChangeEventHandler } from 'react'

type IProps = {
  name: string
  type?: 'text' | 'password' | 'email'
  placeholder?: string
  value: string
  onChange: ChangeEventHandler
}

export const MTextInput = ({
  type = 'text',
  name,
  placeholder = '',
  value,
  onChange
}: IProps) => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className="peer block w-full rounded-md border-0 px-3 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </>
  )
}
