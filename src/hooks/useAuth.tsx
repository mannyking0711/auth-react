import axiosInstance from '../axiosApi'
import { EnAuthLogin, EnAuthSignup, EnUser } from '../models/auth'
import { useState } from 'react'

const useAuth = () => {
  const doLogin = async (user: EnAuthLogin) => {
    return await axiosInstance.post('/token/obtain/', {
      email: user.email,
      password: user.password
    })
  }

  const doLoginWithGoogle = async (user: any) => {
    return await axiosInstance.post('/token/obtain/', {
      email: user.email,
      password: user.sub
    })
  }

  const doSignup = async (user: EnAuthSignup) => {
    return await axiosInstance.post('/user/create/', {
      username: user.username,
      email: user.email,
      password: user.password
    })
  }

  const doSignupWithGoogle = async (user: any) => {
    return await axiosInstance.post('/user/create_google/', user)
  }

  return { doLogin, doLoginWithGoogle, doSignup, doSignupWithGoogle }
}

export default useAuth
