import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginView } from './views/Auth/LoginView'
import { SignupView } from './views/Auth/SignupView'
import { ToastContainer } from 'react-toastify'
import { DashboardView } from './views/DashboardView'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AppContextProvider from './contexts/AppContextProvider'
import { msalConfig } from './utils/authConfig'
import { PublicClientApplication } from '@azure/msal-browser'
import { MsalProvider } from '@azure/msal-react'

const msalInstance = new PublicClientApplication(msalConfig)

function App() {
  return (
    <GoogleOAuthProvider
      clientId={
        '680525957986-lhnso5q9nbqp66ginbnuagdeb0dou7mc.apps.googleusercontent.com'
      }
    >
      <MsalProvider instance={msalInstance}>
        <AppContextProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginView />} />
              <Route path="/signup" element={<SignupView />} />
              <Route path="/dashboard" element={<DashboardView />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
          </BrowserRouter>
          <ToastContainer />
        </AppContextProvider>
      </MsalProvider>
    </GoogleOAuthProvider>
  )
}

export default App
