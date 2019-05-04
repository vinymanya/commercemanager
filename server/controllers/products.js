const Product = require('mongoose').model('Product')

module.exports = {
  // Retrieve all products
  allProducts(request, response) {
    Product.find({})
      .then(products => {
        response.json(products)
      })
      .catch(() => {
        response.status(401).json("Couldn't find products!")
      })
  },

  create(request, response) {
    // create a new product
    Product.create(request.body)
      .then(product => {
        response.json(product)
      })
      .catch((error) => response.status(401).json(
        Object.keys(error.errors).map(key => error.errors[key].message)
      ))
  },
  // Show a specific product
  show(request, response) {
    Product.findOne({_id: request.params.id})
      .then(product => {
        response.json(product)
      })
      .catch(() => response.status(404).json(`Couldn't find Product: ${request.params.id}`))
  },
  // Update a product
  update(request, response) {
    Product.findOne({_id: request.params.id})
      .then(product => {
        product.name = request.body.name || product.name
        product.quantity = request.body.quantity || product.quantity
        product.price = request.body.price || product.price
        return product.save()
      })
      .then((product) => {
        console.log(product)
        response.json(product)
      })
      .catch(() => response.status(404).json(`Couldn't find/update Product: ${request.params.id}`))
  },
  // Delete a product
  delete(request, response) {
    Product.findOneAndDelete({_id: request.params.id})
      .then(product => {
        response.json(`${product.name} was successfully deleted!`)
      })
      .catch(() => response.status(401).json("Couldn't delete this product!"))
  }
}
