
const config = require('../config/config.js')
var axios = require('axios')
module.exports = {
  search (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/search?query=${req.params.search}&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        console.log(response.data.items)
        res.send(response.data.items)
      }).catch(error => console.log(error))
  },
  update (req, res) {
    axios.get(`http://api.walmartlabs.com/v1/items${req.params.id}&format=json&apiKey=${config.authentication.walmartApi}`)
      .then(response => {
        console.log(response.data.items[0].name + '\n' +
          response.data.items[0].shortDescription + '\n' +
          '$' + response.data.items[0].salePrice)
        res.render(response)
      }).catch(error => console.log(error))
  }
}
