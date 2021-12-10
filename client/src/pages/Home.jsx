import React from 'react'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { ThemeContext } from '../context/theme'
import img from '../images/anthony-delanoix-hzgs56Ze49s-unsplash.jpg'
import { Navbar } from '../components/Navbar'

export const Home = () => {
  const [{ isDark }] = useContext(ThemeContext)
  return (
    <div>
      <Navbar />
      <img src={img} className='home-img' alt='' />

      <div className='home-container'>
        <div className='home-hero'>
          <h1>Welcome to My Concerts</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facere
            consequuntur aut provident minima reiciendis adipisci sequi eaque
            blanditiis mollitia pariatur!
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
    </div>
  )
}
