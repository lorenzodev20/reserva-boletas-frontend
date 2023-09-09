import axios from 'axios'

const apiUrl = process.env.VUE_APP_BACKEND_URL

const reservationsApi = axios.create({ baseURL: apiUrl })

export default reservationsApi