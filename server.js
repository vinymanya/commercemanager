const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors') // to allow 'Access-Control-Allow-Origin'
const helmet = require('helmet') // for securing our api
const logger = require('morgan')

require('dotenv').config()

const app = express()

app.enable('trust proxy')

app.use(logger('dev'))
app.use(cors()) // Accept http request from cross-domains
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set(express.static(path.join(__dirname, 'dist')))
app.set('host', '127.0.0.1')
app.set('port', process.env.PORT || 8000)

require('./server/config/database')
require('./server/config/routes')(app)

const server = app.listen(app.get('port'), () => {
  console.log(`🚀 Server listening on port ${server.address().port}...`)
})
