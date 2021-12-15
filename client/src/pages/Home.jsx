import axios from 'axios'
import React, { useEffect, useState, useContext } from 'react'
import { UserNav } from '../components/UserNav'
import { ThemeContext } from '../context/theme'
import { AuthContext } from '../context/auth'
import { Link } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faFacebook,
  faInstagram,
  faTwitter,
  faYoutube,
  faSpotify,
  faItunes,
  faSoundcloud,
} from '@fortawesome/free-brands-svg-icons'
import { faArrowCircleUp } from '@fortawesome/free-solid-svg-icons'
// import { eventNames } from '../../../app'

export const Home = () => {
  const [{ isDark }] = useContext(ThemeContext)
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('')
  const [filterCountry, setFilterCountry] = useState('')
  const [search, setSearch] = useState('')
  const [showButton, setShowButton] = useState(false)
  const [message, setMessage] = useState(false)

  console.log(events)

  const { user } = useContext(AuthContext)

  uuidv4()

  let countryFilter = events.filter((event) =>
    event.venue.country.toLowerCase().includes(filterCountry.toLowerCase())
  )

  let filtered = countryFilter.filter((event) =>
    event.venue.city.toLowerCase().includes(filter.toLowerCase())
  )

  const searchHandler = (e) => {
    e.preventDefault()
    setSearch(e.target.artistName.value)
    e.target.artistName.value = ''
    setTimeout(() => {
      setMessage(true)
    }, 2000)
  }

  const filterCountryHandler = (e) => {
    setFilterCountry(e.target.value)
  }

  const filterHandler = (e) => {
    setFilter(e.target.value)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    if (search === undefined || search.length === 0) return
    axios
      .get(
        `https://rest.bandsintown.com/artists/${search}/events?app_id=17a65355d3365096089d25b92d9c9c98`
      )
      .then((response) => {
        // console.log(response.data)
        setEvents(response.data)
      })
      .catch((err) => console.log(err))
  }, [search])

  useEffect(() => {
    const eventsLocal = window.localStorage.getItem('events') || []
    setEvents(JSON.parse(eventsLocal))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('events', JSON.stringify(events))
  }, [events])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      window.pageYOffset > 5000 ? setShowButton(true) : setShowButton(false)
    })
  }, [])

  return (
    <>
      <UserNav />
      <div className='search-artist'>
        <div>
          <p>
            <strong className={isDark ? 'text-yellow' : 'text-bold'}>
              Search
            </strong>{' '}
            for the next concert by your favorite Artist! Check if they play in
            your city and save it in your own calendar.
          </p>
        </div>

        {window.innerWidth >= 1100 ? (
          <form onSubmit={searchHandler}>
            <input
              id='input-fr'
              className={isDark ? 'btn-yellow' : 'btn-dark'}
              value='Search'
              type='submit'
            />
            <div className='div-search-input'>
              <input
                id='search-input'
                className={isDark ? 'form-input-dark' : 'form-input-light'}
                name='artistName'
                type='text'
                placeholder='Search artist'
              />
            </div>
          </form>
        ) : (
          <form onSubmit={searchHandler}>
            <input
              id='search-input'
              className={isDark ? 'form-input-dark' : 'form-input-light'}
              name='artistName'
              type='text'
              placeholder='Search artist'
            />
            <button
              className={isDark ? 'btn-yellow' : 'btn-dark'}
              type='submit'
            >
              Search
            </button>
          </form>
        )}

        {(search === undefined || search.length) === 0
          ? ''
          : events.length === 0 &&
            message === true && (
              <p className='artist-not-found'>
                This artist does not exist, please check for any spell mistakes
                & try again
              </p>
            )}

        {events.length === 0 ? (
          ''
        ) : (
          <>
            {/* Filter Inputs */}
            <input
              id='filter-input'
              className={isDark ? 'form-input-dark' : 'form-input-light'}
              value={filter}
              type='text'
              onChange={filterHandler}
              placeholder='Filter by city'
            />

            <input
              id='filter-input'
              className={isDark ? 'form-input-dark' : 'form-input-light'}
              value={filterCountry}
              type='text'
              onChange={filterCountryHandler}
              placeholder='Filter by country'
            />
          </>
        )}
      </div>

      <div>
        {filtered.map((event) => (
          <div key={event.id} className='event-card'>
            <h3>{events[0].artist.name}</h3>
            <div className='flex-card'>
              <div>
                <p>Location: {event.venue.location}</p>
                <p>Venue Name: {event.venue.name}</p>
              </div>

              <div>
                <p>Date: {event.datetime.slice(0, 10)}</p>
                <p>Time: {event.datetime.slice(11, 16)}</p>
              </div>
            </div>
            <div>
              <p className='mb1'>
                Tickets Status:{' '}
                <span className='text-yellow'>
                  {event.offers[0]
                    ? event.offers[0].status.toUpperCase()
                    : 'UNKNOWN'}
                </span>
              </p>
            </div>

            <div className='flex-card'>
              <div>
                <a
                  target='blank'
                  href={event.offers[0] ? event.offers[0].url : ''}
                >
                  {event.offers[0] ? (
                    <button className={isDark ? 'btn-yellow' : 'btn-dark'}>
                      Buy tickets
                    </button>
                  ) : (
                    ''
                  )}
                </a>
              </div>

              <div>
                <Link to=''>
                  <h5
                    onClick={(e) => {
                      const reqBody = {
                        user: user._id,
                        artistName: events[0].artist.name,
                        location: event.venue.location,
                        venueName: event.venue.name,
                        date: event.datetime.slice(0, 10),
                        time: event.datetime.slice(11, 16),
                      }
                      axios
                        .post('/api/concerts', reqBody)
                        .then((response) => {
                          // console.log(response)
                        })
                        .catch((err) => console.log(err))
                    }}
                    className={isDark ? 'btn-light' : 'btn-dark'}
                  >
                    Save to my calendar
                  </h5>
                </Link>
              </div>
            </div>

            <div className='social-icons'>
              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'facebook' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faFacebook}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'instagram' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faInstagram}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'twitter' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faTwitter}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'youtube' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faYoutube}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'spotify' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faSpotify}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'itunes' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faItunes}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}

              {events[0].artist.links.length !== 0
                ? events[0].artist.links.map((link) =>
                    link.type === 'soundcloud' ? (
                      <a key={uuidv4} target='blank' href={link.url}>
                        <FontAwesomeIcon
                          className={isDark ? 'icon-light' : 'icon-dark'}
                          icon={faSoundcloud}
                          size='lg'
                        />
                      </a>
                    ) : (
                      ''
                    )
                  )
                : ''}
            </div>
          </div>
        ))}
      </div>

      {showButton && (
        <FontAwesomeIcon
          icon={faArrowCircleUp}
          onClick={scrollToTop}
          className={isDark ? 'back-to-top-yellow' : 'back-to-top-dark'}
        />
      )}
    </>
  )
}
