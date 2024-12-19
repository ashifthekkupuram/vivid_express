import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

instance.interceptors.response.use(
    async (response) => {
        return response
    },
    (error) => {
        return Promise.reject(error)
    }
)

export default instance