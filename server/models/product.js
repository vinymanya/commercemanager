const mongoose = require('mongoose')
const { Schema } = mongoose

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Product name is required!'],
    trim: true,
    minlength: 3
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required!'],
    trim: true,
    min: 0
  },
  price: {
    type: Number,
    required: [true, 'Price is required!'],
    trim: true,
    min: 0
  }
}, {timestamps: true})

module.exports = mongoose.model('Product', productSchema)
