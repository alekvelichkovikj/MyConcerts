import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/auth'
import { ThemeContext } from '../context/theme'
import { Navbar } from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

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
        const token = response.data.authToken
        loginUser(token)
        navigate('/my-concerts')
      })
      .catch((err) => {
        // console.log(err.response.data.errors)
        // console.log(err.response.data.errors[0].msg)
        err.response.data.errors !== undefined
          ? setErrorMessage(err.response.data.errors[0].msg)
          : setErrorMessage(err.response.data.msg)
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
            placeholder='Enter password'
            value={password}
            onChange={handlePassword}
          />

          <button className={isDark ? 'btn-yellow' : 'btn-dark'} type='submit'>
            Login
          </button>

          {errorMessage && (
            <>
              <FontAwesomeIcon className='x' icon={faTimes} size='2x' />
              <p className='error-message'> {errorMessage}</p>
            </>
          )}
        </form>

        <div>
          <p>You don't have an account yet?</p>
          <div>
            <Link to='/signup'>
              <button className={isDark ? 'btn-light' : 'btn-dark'}>
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
