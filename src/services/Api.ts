import axios from 'axios'

export const api = axios.create({
    //baseURL: 'https://neotasks-backend.up.railway.app'
    //baseURL: 'http://localhost:3333'
    baseURL: 'https://neotasks.neoscan.com.br'
})

