
import axios from 'axios'

export default {
  query (value) {
    console.log(value)
    if (value === undefined) {
      return false
    } else {
      return axios.post(`http://localhost:8081/api/walmart/${value}`)
    }
  }
}
