const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const request = require('request');
const cors = require('cors')
const Tiket = require('./models/Tiket')

const app = express()

app.use(cors())

const PORT = config.get('port') || 8000
const MONGO_URI = config.get('mongoURI')
const DATA = config.get('data')

const startApp = async () => {
  try {
    await mongoose.connect(MONGO_URI, 
      {
        useNewUrlParser: true, 
        useUnifiedTopology: true
      }, 
      () => console.log('connected to DB'))
    Tiket.collection.drop()

    request(DATA, {json: true}, (e, res, body) => {
      body.forEach(element => {
        const tiket = new Tiket({
          ticketId: element.ticketId,
          number: element.number,
          lastUpdatedTime: element.lastUpdatedTime,
          owner: element.owner,
          reportedTime: element.reportedTime,
          status: element.status,
          description: element.description,
          asset: element.asset
        })
        tiket.save()
      });
    })

    app.listen(PORT, () => {
      console.log('server ap', PORT)
    })
  } catch (error) {
    console.log(error)
  }
}

startApp()


app.get('/', async (req, res) => {
  const data = await Tiket.find({})
  const tikets = data.map(item => {
    return {
      ticketId: item.ticketId,
      number: item.number,
      lastUpdatedTime: new Date(item.lastUpdatedTime),
      owner: item.owner,
      reportedTime: new Date(item.reportedTime),
      status: item.status,
      description: item.description,
      asset: item.asset
    }
  })
  res.send(JSON.stringify(tikets))
})



