import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'

export const ProtectedRoute = ({ children, redirectTo }) => {
  const { isLoggedIn, isLoading } = useContext(AuthContext)

  if (isLoading) return <></>

  return isLoggedIn ? children : <Navigate to={redirectTo} />
}
