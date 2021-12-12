import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import axios from 'axios'
import { Navbar } from '../components/Navbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

export const Signup = () => {
  const [{ isDark }] = useContext(ThemeContext)

  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(undefined)

  const navigate = useNavigate()

  const handleEmail = (e) => setEmail(e.target.value)
  const handleName = (e) => setName(e.target.value)
  const handlePassword = (e) => setPassword(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    const requestBody = { email, password, name }

    axios
      .post('/auth/signup', requestBody)
      .then((response) => {
        navigate('/login')
      })
      .catch((err) => {
        // console.log(err.response.data.errors)
        err.response.data.errors !== undefined
          ? setErrorMessage(err.response.data.errors[0].msg)
          : setErrorMessage(err.response.data.msg)
      })
  }

  return (
    <>
      <Navbar />
      <div className='form-container'>
        <h3>Create an account</h3>
        <form onSubmit={handleSubmit}>
          <input
            className={isDark ? 'form-input-dark' : 'form-input-light'}
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={handleName}
          />

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
            Sign Up
          </button>
          {errorMessage && (
            <>
              <FontAwesomeIcon className='x' icon={faTimes} size='2x' />
              <p className='error-message'> {errorMessage}</p>
            </>
          )}
        </form>

        <div>
          <p>You already have an account?</p>
          <div>
            <Link to='/login'>
              <button className={isDark ? 'btn-light' : 'btn-dark'}>
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
