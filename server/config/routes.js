const productController = require('../controllers/products')
const path = require('path')

module.exports = function (app) {
  app.get('/api/products', productController.allProducts)
  app.post('/api/products/new', productController.create)
  app.get('/api/products/:id', productController.show)
  app.put('/api/products/:id', productController.update)
  app.delete('/api/products/:id', productController.delete)

  app.all('*', (req, res, next) => {
    res.sendFile(path.resolve('dist/', 'index.html'))
  })
}
