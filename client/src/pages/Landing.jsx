import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import img from '../images/pien-muller-Fh-Q-xfdh_o-unsplash.jpg'
import { Navbar } from '../components/Navbar'

export const Landing = () => {
  const [{ isDark }] = useContext(ThemeContext)

  return (
    <>
      <div style={{ height: '100vh' }}>
        <Navbar />
        {window.innerWidth <= 650 ? (
          <>
            {' '}
            <img src={img} className='home-img' alt='' />
            <div className='home-container'>
              <div className='home-hero'>
                <h1>Welcome to My Concerts</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Facere consequuntur aut provident minima reiciendis adipisci
                  sequi eaque blanditiis mollitia pariatur!
                </p>
              </div>
              <div>
                <Link className='text-link' to='/signup'>
                  <button className={isDark ? 'btn-yellow' : 'btn-dark'}>
                    Sign up here and find your next concert!
                  </button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className='hero'>
            <div className='container'>
              <div className='home-hero'>
                <h1>Welcome to My Concerts</h1>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Facere consequuntur aut provident minima reiciendis adipisci
                  sequi eaque blanditiis mollitia pariatur!
                </p>
              </div>
            </div>
            <div>
              <Link className='text-link' to='/signup'>
                <button className={isDark ? 'btn-yellow' : 'btn-dark'}>
                  Sign up here and find your next concert!
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
