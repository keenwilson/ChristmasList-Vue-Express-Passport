import axios from 'axios'
import store from '@/store/store'

export default () => {
  return axios.create({
    // baseURL points to our back end API
    baseURL: `http://localhost:8081/`,
    // pass in an authorization header to the request header
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })
}
