import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import { AuthContext } from '../context/auth'

export const UserNav = () => {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext)
  const { isLoggedIn, logoutUser } = useContext(AuthContext)
  return (
    <nav className='nav user-nav'>
      <div>
        <Link to='/my-concerts'>
          <h1>MyConcerts</h1>
        </Link>
      </div>
      <div>
        <FontAwesomeIcon
          icon={isDark ? faSun : faMoon}
          onClick={toggleTheme}
          className='icon'
        ></FontAwesomeIcon>
        <Link to={isLoggedIn ? '/user' : '/login'}>
          <FontAwesomeIcon className='icon' icon={faUser} />
        </Link>
        <h3 onClick={logoutUser}>Log Out</h3>
      </div>
    </nav>
  )
}