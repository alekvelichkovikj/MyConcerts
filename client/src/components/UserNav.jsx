import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faStream } from '@fortawesome/free-solid-svg-icons'
import { faSun, faSearch } from '@fortawesome/free-solid-svg-icons'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import { AuthContext } from '../context/auth'

export const UserNav = () => {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext)
  const { logoutUser } = useContext(AuthContext)
  return (
    <div className='bg-yellow'>
      <nav className='nav user-nav'>
        <div>
          <h1>myconcerts</h1>
        </div>
        <div>
          <FontAwesomeIcon
            icon={isDark ? faSun : faMoon}
            onClick={toggleTheme}
            className='icon'
          ></FontAwesomeIcon>
          <Link to='/home'>
            <FontAwesomeIcon className='icon' icon={faSearch} />
          </Link>
          <Link to={'/my-concerts'}>
            <FontAwesomeIcon className='icon' icon={faStream} />
          </Link>
          <h3 className='logout-btn' onClick={logoutUser}>
            Log Out
          </h3>
        </div>
      </nav>
    </div>
  )
}
