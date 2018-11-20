import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL points to our back end API
    baseURL: `http://localhost:8081/`
  })
}
