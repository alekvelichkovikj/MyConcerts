import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AuthContext = React.createContext()

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const navigate = useNavigate()

  const loginUser = (token) => {
    // store this token in local storage
    localStorage.setItem('authToken', token)
    return verifyStoredToken()
  }

  const logoutUser = () => {
    // remove the token from local storage
    localStorage.removeItem('authToken')
    // update state
    setIsLoggedIn(false)
    setUser(null)
    navigate('/login')
  }

  const verifyStoredToken = () => {
    return new Promise((resolve, reject) => {
      // check local storage for an auth token

      const storedToken = localStorage.getItem('authToken')
      if (!storedToken) {
        reject()
        return
      }
      axios
        .get('/auth/verify', {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          // console.log(response)
          const user = response.data

          setUser(user)
          setIsLoggedIn(true)
          setIsLoading(false)

          resolve()
        })
        .catch((err) => {
          // the token is invalid
          setIsLoggedIn(false)
          setUser(null)
          setIsLoading(true)

          reject()
        })
    })
  }

  useEffect(() => {
    verifyStoredToken().catch((err) => {})
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        loginUser,
        logoutUser,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}

export { AuthProviderWrapper, AuthContext }
