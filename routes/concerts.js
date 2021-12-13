const router = require('express').Router()
const User = require('../models/User.model')
const { authenticateJWT } = require('./../middleware/jwt.js')
const Concert = require('../models/MyConcerts')

// @route  GET  Concerts
router.get('/concerts', authenticateJWT, async (req, res) => {
  try {
    const concerts = await Concert.find({ user: req.user._id }).sort({
      date: +1,
    })
    res.json(concerts)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// @route  POST  Concerts
router.post('/concerts', async (req, res) => {
  const { artistName, location, venueName, date, time, user } = req.body
  try {
    const newConcert = new Concert({
      artistName,
      location,
      venueName,
      date,
      time,
      user,
    })

    const concert = await newConcert.save()

    res.json(concert)
  } catch (err) {
    console.error(err.msg)
    res.status(500).send('Server Error')
  }
})

// @route  DELETE  Concert
router.delete('/:id', async (req, res, next) => {
  try {
    let concert = await Concert.findById(req.params.id)
    await Concert.findByIdAndRemove(req.params.id)

    res.json({ msg: 'Concert removed' })
  } catch {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
