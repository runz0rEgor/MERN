const {Schema, model} = require('mongoose')

const schema = new Schema({
  ticketId: Number,
  number: String,
  lastUpdatedTime: Date,
  owner: Object,
  reportedTime: Date,
  status: String,
  description: String,
  asset: Object
})

module.exports = model("tiket", schema);