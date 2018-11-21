
const config = require('../config/config.js')
var itemArr = []
var axios = require('axios')
module.exports = {
  search(req, res) {
    axios.get(`http://api.walmartlabs.com/v1/search?query=${req.params.search}&format=json&apiKey=${config.authentication.walmartApi}`)
          .then(response =>
            item = console.log(
              response.data.items[0].name+"\n",
              response.data.items[0].shortDescription+"\n", 
              "$"+response.data.items[0].salePrice
              )),
              res.send(response)
      .catch(error => console.log(error))
  }
}