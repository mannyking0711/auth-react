import { createContext, useState } from 'react'
import { EnUser } from '../models/auth'
import jwtDecode from 'jwt-decode'

export type AppContextType = {
  currentUser: EnUser
  setCurrentUser: (user: EnUser) => void
}
export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider = (props: any) => {
  const { children } = props

  let localUser: EnUser | null = null
  try {
    localUser = jwtDecode(localStorage.getItem('access_token'))
  } catch (e) {
    localUser = null
  }
  console.log(localUser)

  const [currentUser, setCurrentUser] = useState<EnUser>(
    localUser
      ? localUser
      : {
          username: '',
          email: '',
          picture: ''
        }
  )

  const contextValue = {
    currentUser,
    setCurrentUser: (user: EnUser) => {
      setCurrentUser(user)
    }
  }

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  )
}

export default AppContextProvider
