import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'
import { Navbar } from './Navbar'

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [timer, setTimer] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTimer(false)
    }, 50)
  }, [])

  if (timer)
    return (
      <>
        <Navbar />
      </>
    )

  return isLoggedIn ? children : <Navigate to={redirectTo} />
}
