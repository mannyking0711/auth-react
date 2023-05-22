import { useContext, useEffect } from 'react'
import axiosInstance from '../axiosApi'
import { useToastr } from '../hooks/useToastr'
import { AppContext, AppContextType } from '../contexts/AppContextProvider'
import { useNavigate } from 'react-router-dom'

export const DashboardView = () => {
  const navigate = useNavigate()
  const { notifyError } = useToastr()
  const { currentUser, setCurrentUser } = useContext(
    AppContext
  ) as AppContextType

  useEffect(() => {
    axiosInstance
      .get('/hello')
      .then((ret) => {
        console.log(ret.data)
      })
      .catch(() => {
        notifyError('Auth failed')
      })
  }, [])

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setCurrentUser({
      email: '',
      picture: '',
      username: ''
    })
    navigate('/login')
  }
  return (
    <div>
      <p>Username: {currentUser.username}</p>
      <p>Email: {currentUser.email}</p>
      <button
        className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  )
}
