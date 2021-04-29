import axios from 'axios'

const baseURL = process.env.VUE_APP_BASEURL
const instance = axios.create({
    baseURL
})

export default instance