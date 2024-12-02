import React from 'react'
import Navbar from './components/navbar.component'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/home.component'
import Login from './components/login.component'
import Register from './components/register.component'
import UserProfile from './components/user/profile.component'
import ProtectedRoutes from './utils/ProtectedRoutes'
import GuestRoutes from './utils/GuestRoutes'
import { AuthProvider } from './context/AuthProvider'
import { ToastContainer } from 'react-toastify'
import PersistLogin from './components/persist-login.component'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <ToastContainer
          autoClose={3000}
          position="top-right"
        />
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="/" element={<Home />} />

            <Route element={<GuestRoutes />}>
              <Route path="/auth/login" element={<Login />} />
              <Route path="/auth/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
              <Route path="user/profile" element={<UserProfile />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App