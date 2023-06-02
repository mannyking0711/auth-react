import { createContext, useState } from 'react'
import { EnUser } from '../models/auth'
import jwtDecode from 'jwt-decode'
import axiosInstance from '../axiosApi'

type IPageName = 'dashboard' | 'request_scan' | 'domains' | 'login'

export type AppContextType = {
  currentPage: IPageName
  setCurrentPage: (pageName: IPageName) => void
  currentUser: EnUser
  setCurrentUser: (accessToken?: string, refreshToken?: string) => void
}
export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider = (props: any) => {
  const { children } = props

  let localUser: EnUser | null = null
  try {
    const user: any = jwtDecode(localStorage.getItem('access_token')!)
    if (user.exp >= Date.now() / 1000) localUser = user
    else localUser = null
  } catch (e) {
    localUser = null
  }

  const [currentUser, setCurrentUser] = useState<EnUser>(
    localUser
      ? localUser
      : {
          username: '',
          email: '',
          picture: ''
        }
  )

  const [currentPage, setCurrentPage] = useState<string>('')

  const contextValue = {
    currentPage,
    setCurrentPage,
    currentUser,
    setCurrentUser: (accessToken?: string, refreshToken?: string) => {
      if (accessToken === undefined || refreshToken === undefined) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        axiosInstance.defaults.headers['Authorization'] = null
        setCurrentUser({
          username: '',
          email: '',
          picture: ''
        })
      } else {
        localStorage.setItem('access_token', accessToken)
        localStorage.setItem('refresh_token', refreshToken)
        axiosInstance.defaults.headers['Authorization'] = 'JWT ' + accessToken
        setCurrentUser(jwtDecode(accessToken))
      }
    }
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
