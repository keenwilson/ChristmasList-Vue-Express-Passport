
const config = require('../config/config.js')
var axios = require('axios')

module.exports = {
  search (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/search?query=${req.params.search}&format=json&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        for (let i = 0; i <= 10; i++) {
          var item = {
            itemId: response.data.items[i].itemId,
            itemName: response.data.items[i].name,
            imageUrl: `<img src="${response.data.items[i].mediumImage}"/>`,
            productUrl: `<a href="${response.data.items[i].productUrl}">Product Page</a>`,
            price: response.data.items[i].salePrice,
            description: response.data.items[i].shortDescription
          }
          res.send(item)
        }
      }).catch(error => console.log(error))
  },
  update (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/items${req.params.id}&format=json&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        var item = {
          itemId: response.data.items.itemId,
          itemName: response.data.items.name,
          imageUrl: `<img src="${response.data.items.mediumImage}"/>`,
          productUrl: `<a href="${response.data.items.productUrl}">Product Page</a>`,
          price: response.data.items.salePrice,
          description: response.data.items.shortDescription
        }
        res.send(item)
      }).catch(error => console.log(error))
  }
}
