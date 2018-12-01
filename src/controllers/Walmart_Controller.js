
const config = require('../config/config.js')
var axios = require('axios')

module.exports = {
  search (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/search?query=${req.params.search}&format=json&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        res.send(response.data.items)
      }).catch(error => console.log(error))
  },
  update (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/items${req.params.id}&format=json&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        var item = {
          itemId: response.data.items.itemId,
          itemName: response.data.items.name,
          imageUrl: response.data.items.mediumImage,
          productUrl: response.data.items.productUrl,
          price: response.data.items.salePrice,
          description: response.data.items.shortDescription
        }
        res.send(item)
      }).catch(error => console.log(error))
  }
}
