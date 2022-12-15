import axios from 'axios'

const token = 'q1234567890';

const http = axios.create({
  baseURL: 'https://rdtest.ml/',
  timeout: 1000,
  headers: {
    'Accept': 'application/json, */*',
    'Content-Type': 'multipart/form-data',
    'Authorization': `Bearer ${token}`
  }
})

export const topAlbum = () => http.get('api/catalog/new/bd')

export const teasers = () => http.get('api/catalog/marketing/bd')

export const alboms = current => http.get(`api/catalog/next/bd/${current}`)

