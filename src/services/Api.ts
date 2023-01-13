import axios from 'axios'

export const api = axios.create({
    baseURL: 'https://neotasks-backend.up.railway.app'
})

