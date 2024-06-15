import axios from 'axios'
import app from '@/app/config/constants';

const httpClient = axios.create({
  baseURL: app.backendUrl,
})

// Request Interceptor for adding headers to all requests
httpClient.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => Promise.reject(error)
)

// Response Interceptor for handling errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
)


export { httpClient }
