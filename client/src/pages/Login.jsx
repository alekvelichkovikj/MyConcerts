import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { ThemeContext } from '../context/theme'
import { Navbar } from '../components/Navbar'

export const Login = () => {
  const [{ isDark }] = useContext(ThemeContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const { loginUser } = useContext(AuthContext)

  const handleEmail = (e) => setEmail(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password }

    axios
      .post('/auth/login', requestBody)
      .then((response) => {
        // console.log('i have a token mothafuckas', response.data.authToken)
        const token = response.data.authToken
        // call login user function from auth context
        loginUser(token)
        navigate('/my-concerts')
      })
      .catch((err) => {
        const errorDescrition = err.response.data.errors[0].msg
        if (!errorDescrition === undefined) {
          setErrorMessage(errorDescrition)
        }
      })
  }

  return (
    <>
      <Navbar />
      <div className='form-container'>
        <h3>Welcome back</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={isDark ? 'form-input-dark' : 'form-input-light'}
            type='text'
            placeholder='Enter your email'
            name='email'
            value={email}
            onChange={handleEmail}
          />

          <input
            className={isDark ? 'form-input-dark' : 'form-input-light'}
            type='password'
            placeholder='Pick a password'
            value={password}
            onChange={handlePassword}
          />

          <button className={isDark ? 'btn-yellow' : 'btn-dark'} type='submit'>
            Login
          </button>
          {errorMessage && <p>{errorMessage}</p>}
        </form>

        <div>
          <p>You don't have an account yet?</p>
          <Link to='/signup'>
            <button className={isDark ? 'btn-light' : 'btn-dark'}>
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
