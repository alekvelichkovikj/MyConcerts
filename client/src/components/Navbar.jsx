import React, { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon } from '@fortawesome/free-solid-svg-icons'
import { faSun } from '@fortawesome/free-solid-svg-icons'

export const Navbar = () => {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext)
  return (
    <div className='bg-yellow'>
      <nav className='nav'>
        <div>
          <Link to='/'>
            <h1>myconcerts</h1>
          </Link>
        </div>
        <div>
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            onClick={toggleTheme}
            className='icon'
          ></FontAwesomeIcon>
          <Link to='/login'>
            <h3>Sign In</h3>
          </Link>
        </div>
      </nav>
    </div>
  )
}
