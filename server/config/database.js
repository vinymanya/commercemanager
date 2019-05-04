const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
const regEx = new RegExp('\\.js$', 'i')

// Configuration Options for mongodb connection
const connectionOptions = {
  useNewUrlParser: true
}

// Establish a connection to mongoDB
mongoose.connect('mongodb://127.0.0.1:27017/products', connectionOptions)
// Listen to a connected event
mongoose.connection.on('connected', () => console.log(`connected to mongodb server 👍🏾`)
)

// Specify the directory that contains models
const modelsPath = path.resolve('server', 'models')

// Read all files synchronously in modelsPath
fs.readdirSync(modelsPath).forEach(file => {
  if (regEx.test(file)) {
    require(path.join(modelsPath, file))
  }
})
