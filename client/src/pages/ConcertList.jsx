import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { ThemeContext } from '../context/theme'
import axios from 'axios'
import { UserNav } from '../components/UserNav'

export const ConcertList = () => {
  const [{ isDark }] = useContext(ThemeContext)
  const [concerts, setConcerts] = useState([])

  const storedToken = localStorage.getItem('authToken')

  const getAllConcerts = () => {
    axios
      .get('/api/concerts', {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        console.log(response)
        setConcerts(response.data)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    getAllConcerts()
  }, [])

  return (
    <div className='my-list'>
      <UserNav />
      <h1>My Concerts</h1>
      {concerts.map((concert) => (
        <div key={concert._id} className='concert-list'>
          <div className='event-card'>
            <h3 className={isDark ? 'text-yellow' : 'text-bold'}>
              {concert.artistName}
            </h3>
            <div className='flex-card'>
              <div className='mb2'>
                <p>Location: {concert.location}</p>
                <p>Venue Name: {concert.venueName}</p>
              </div>

              <div className='flex-card-list'>
                <div>
                  <p className={isDark ? 'text-yellow' : 'text-bold'}>
                    Date: {concert.date}
                  </p>
                  <p className={isDark ? 'text-yellow' : 'text-bold'}>
                    Time: {concert.time}
                  </p>
                </div>
                <h5
                  onClick={() => {
                    axios
                      .delete(`/api/${concert._id}`)
                      .then(() => {
                        console.log('success')
                        getAllConcerts()
                      })
                      .catch((err) => console.log(err))
                  }}
                  className={isDark ? 'btn-light' : 'btn-dark'}
                >
                  Remove
                </h5>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
