import { useState } from 'react'
import { MTextInput } from '../../components/Input/MTextInput'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

export const SignupView = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState<boolean>(false)
  const [responseError, setResponseError] = useState<string>('')

  const { handleLogin, login } = useAuth()

  const validationFormSchema = yup.object({
    email: yup
      .string()
      .email('Please enter a valid email address.')
      .required('email is required'),
    password: yup
      .string()
      .required('password is required')
      .min(8, 'Your password length must be greater than or equal to 8')
      .matches(
        /[a-z]+/,
        'Your password must contain one or more lowercase characters.',
      )
      .matches(
        /[A-Z]+/,
        'Your password must contain one or more uppercase characters.',
      )
      .matches(
        /[@$!%*#?&]+/,
        'The password must contain one or more special characters.',
      )
      .matches(/\d+/, 'Your password must contain one or more numeric values.'),
    confirmPassword: yup
      .string()
      .required('Password confirm is required')
      .test('match', 'Passwords must match', (value, { parent }) => {
        return value === parent.password
      }),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: validationFormSchema,
    onSubmit: async (values) => {
      setLoading(true)

      if (
        values.email &&
        values.password &&
        values.email.length !== 0 &&
        values.password.length !== 0
      ) {
        const result = await login(values.email, values.password)
        if (result.loginResult && result.loginResult.isError === false) {
          localStorage.setItem('token', result.loginResult.accessToken)
          localStorage.setItem('name', result.loginResult.userName)
          localStorage.setItem('email', result.loginResult.email)

          handleLogin(result.loginResult.accessToken)
          notify(result.loginResult.message)
          navigate('/')
        } else if (result && result.isError === true) {
          if (result.hasOwnProperty('isActive') && !result.isActive) {
            setResponseError(result.message)
          } else {
            notify(result.message)
          }
        } else {
          notify('Login Failed!')
        }
      }

      setLoading(false)
    },
  })

  const notify = (message: string): void => {
    toast(message, {
      type: 'error',
      theme: 'colored',
    })
  }

  return (
    <>
      <div className="flex sm:max-w-sm sm:mx-auto min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:w-full">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full gap-2 flex flex-col">
          <button className="flex w-full justify-center rounded-sm shadow-md items-center p-2 text-sm hover:text-blue-400">
            <img src="https://img.icons8.com/?id=V5cGWnc9R4xj&format=png" width="20" />
            &nbsp;Sign up with Google
          </button>
          <button className="flex w-full justify-center rounded-sm shadow-md items-center p-2 text-sm hover:text-blue-400">
            <img src="https://img.icons8.com/?id=22989&format=png" width="20" />
            &nbsp;Sign up with Microsoft
          </button>
        </div>

        <div
          className="sm:mx-auto sm:w-full my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
          <p
            className="mx-4 mb-0 text-center font-semibold dark:text-white">
            Or
          </p>
        </div>

        <div className="sm:w-full">
          <form className="" onSubmit={formik.handleSubmit}>
            <MTextInput
              name="email"
              type="email"
              value={formik.values.email}
              placeholder="E-mail address"
              onChange={formik.handleChange}
            />
            <p className="my-3 px-3 text-sm text-[#ff0000]">
              {formik.touched.email && formik.errors.email}
            </p>

            <MTextInput
              name="password"
              type="password"
              value={formik.values.password}
              placeholder="Password"
              onChange={formik.handleChange}
            />
            <p className="my-3 px-3 text-sm text-[#ff0000]">
              {formik.touched.password && formik.errors.password}
            </p>

            <MTextInput
              name="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              placeholder="Confirm password"
              onChange={formik.handleChange}
            />
            <p className="my-3 px-3 text-sm text-[#ff0000]">
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </p>

            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
              {
                loading ?
                  <svg aria-hidden="true"
                       className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-red-600"
                       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor" />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill" />
                  </svg> :
                  'Sign up'
              }
            </button>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Have an account? Click here to{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}