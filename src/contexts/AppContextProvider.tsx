import { createContext, useState } from 'react'
import { EnUser } from '../models/auth'

export type AppContextType = {
  currentUser: EnUser
  setCurrentUser: (user: EnUser) => void
}
export const AppContext = createContext<AppContextType | null>(null)

const AppContextProvider = (props: any) => {
  const { children } = props

  const [currentUser, setCurrentUser] = useState<EnUser>({
    username: '',
    email: '',
    picture: ''
  })

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
