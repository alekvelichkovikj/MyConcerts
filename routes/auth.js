const router = require('express').Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User.model')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('./../middleware/jwt.js')
const { check, validationResult } = require('express-validator')

const saltRounds = 10

// POST signup
router.post(
  '/signup',
  check('name', 'Please add name').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res.status(400).json({ msg: 'User already exists' })
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      user = new User({
        name,
        email,
        password: hashedPassword,
      })

      const savedUser = await user.save()

      return res
        .status(201)
        .json({ message: `User created: ${savedUser.name}` })
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

// POST login
router.post(
  '/login',
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists(),
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' })
      }

      const isMatch = await bcrypt.compare(password, user.password)
      if (isMatch) {
        const { _id, email, name } = user
        const payload = { _id, email, name }

        // create the json web token
        const authToken = jwt.sign(payload, process.env.JWT_SECRET, {
          algorithm: 'HS256',
          expiresIn: '12h',
        })
        res.status(200).json({ authToken: authToken })
      } else {
        res.status(401).json({ message: 'Unable to authenticate user' })
      }
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: 'Internal Server Error' })
    }
  }
)

// Verify token
router.get('/verify', isAuthenticated, (req, res, next) => {
  // if the token is valid we can access it on : req.payload
  console.log('request payload: ', req.payload)
  res.status(200).json(req.payload)
})

module.exports = router
