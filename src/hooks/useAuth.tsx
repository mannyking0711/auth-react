import axiosInstance from '../axiosApi'
import { EnAuthLogin, EnAuthSignup, EnUser } from '../models/auth'
import { useContext, useState } from 'react'
import { AppContext, AppContextType } from '../contexts/AppContextProvider'

const useAuth = () => {
  const { setCurrentUser } = useContext(AppContext) as AppContextType

  const doLogin = async (user: EnAuthLogin) => {
    return await axiosInstance.post('/token/obtain/', {
      email: user.email,
      password: user.password
    })
  }

  const doLoginWithGoogle = async (user: any) => {
    return await axiosInstance.post('/token/obtain/', user)
  }

  const doSignup = async (user: EnAuthSignup) => {
    return await axiosInstance.post('/user/create/', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  const doLogout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setCurrentUser()
  }

  return { doLogin, doLoginWithGoogle, doSignup, doLogout }
}

export default useAuth
