import axios from 'axios'

const PATH = [
    'http://reserva-boletas-backend.test:8088'
];

const reservationsApi = axios.create({
    baseURL: PATH[0]
})

export default reservationsApi