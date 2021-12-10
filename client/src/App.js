import './App.css'
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { useContext } from 'react'
import { ThemeContext } from './context/theme'
import { MyConcerts } from './pages/MyConcerts'

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
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/my-concerts' element={<MyConcerts />} />
      </Routes>
    </div>
  )
}
