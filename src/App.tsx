import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LoginView } from './views/Auth/LoginView'
import { SignupView } from './views/Auth/SignupView'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginView />} />
          <Route path="/signup" element={<SignupView />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  )
}

export default App
