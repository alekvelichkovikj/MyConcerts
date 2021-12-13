const { Schema, model } = require('mongoose')

const concertSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  artistName: String,
  location: String,
  venueName: String,
  date: String,
  time: String,
})

const Concert = model('concert', concertSchema)

module.exports = Concert
