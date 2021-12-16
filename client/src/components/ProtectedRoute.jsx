import React, { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'
import { UserNav } from './UserNav'

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { isLoggedIn } = useContext(AuthContext)
  const [timer, setTimer] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setTimer(false)
    }, 500)
  }, [])

  if (timer)
    return (
      <>
        <UserNav />
      </>
    )

  return isLoggedIn ? children : <Navigate to={redirectTo} />
}
