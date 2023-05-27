import { useContext, useEffect } from 'react'
import { AppContext, AppContextType } from '../../contexts/AppContextProvider'
import { Route, useNavigate } from 'react-router-dom'

export const PrivateRoute = (props: any) => {
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(AppContext) as AppContextType
  useEffect(() => {
    if (currentUser.username === '') {
      setCurrentUser()
      navigate('/login')
    }
  })
  return <Route {...props} />
}
