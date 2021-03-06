import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Landing } from './pages/Landing'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { useContext } from 'react'
import { ThemeContext } from './context/theme'
import { Home } from './pages/Home'
import { MyConcerts } from './pages/MyConcerts'
import { ProtectedRoute } from './components/ProtectedRoute'

export const App = () => {
  const [{ theme }] = useContext(ThemeContext)

  return (
    <div
      className='app'
      style={{
        backgroundColor: theme.backgroundColor,
        color: theme.color,
      }}
    >
      <Routes>
        <Route
          path='/home'
          element={
            <ProtectedRoute redirectTo='/login'>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-concerts'
          element={
            <ProtectedRoute redirectTo='/login'>
              <MyConcerts />
            </ProtectedRoute>
          }
        />
        <Route path='/' element={<Landing />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}
