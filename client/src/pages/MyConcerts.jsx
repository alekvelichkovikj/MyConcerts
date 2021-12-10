import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { UserNav } from '../components/UserNav'
import { ThemeContext } from '../context/theme'
// import { AuthContext } from '../context/auth'
// import { useContext } from 'react'

export const MyConcerts = () => {
  // const { user } = useContext(AuthContext)
  const [{ isDark }] = useContext(ThemeContext)
  const [events, setEvents] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search === undefined || search.length === 0) return
    axios
      .get(
        `https://rest.bandsintown.com/artists/${search}/events?app_id=17a65355d3365096089d25b92d9c9c98`
      )
      .then((response) => {
        console.log(response.data)
        setEvents(response.data)
      })
      .catch((err) => console.log(err))
  }, [search])

  const searchHandler = (e) => {
    e.preventDefault()
    setSearch(e.target.artistName.value)
    // console.log(e.target.artistName.value)
  }

  return (
    <>
      <UserNav />
      <div className='search-artist'>
        <div>
          {/* <h5>welcome {user.name}</h5> */}
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero,
            aperiam.
          </p>
        </div>

        <form onSubmit={searchHandler}>
          <input
            className={isDark ? 'form-input-dark' : 'form-input-light'}
            name='artistName'
            type='text'
            placeholder='Search by Artist'
          />
          <button className={isDark ? 'btn-yellow' : 'btn-dark'} type='submit'>
            Search
          </button>
        </form>
      </div>

      <div>
        {events.map((event) => (
          <div key={event.id} className='event-card'>
            <p>{event.artist.name}</p>
            {/* <img src={event.artist.image_url} alt='' /> */}
            <p>
              {event.venue.country} | {event.venue.city} | Venue Name:{' '}
              {event.venue.name}
            </p>
          </div>
        ))}
      </div>
    </>
  )
}
// https://www.eventbriteapi.com/v3/users/me/?token=7ZU5HYNPRN7KO7E565C4
// 17a65355d3365096089d25b92d9c9c98
