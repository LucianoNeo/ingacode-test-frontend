import axios from 'axios'

export const api = axios.create({
    //baseURL: 'https://neotasks-backend.up.railway.app'
    //baseURL: 'http://localhost:3333'
    baseURL: 'http://154.12.232.78:3333'
})

