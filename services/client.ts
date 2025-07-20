import { getAccessToken } from '@/hooks/useAuthToken'
import axios from 'axios'

const client = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL || 'http://192.168.1.24:8000/api/v1',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default client
