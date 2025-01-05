import axios from 'axios'

import useAuth from '../state/useAuth'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        const token = useAuth.getState().token || ''
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

const refreshToken = async () => {
    const setAuth = useAuth.getState().setAuth
    try {
        const response = await axios.post(`${baseURL}/auth/refresh`, {},{ withCredentials: true })
        setAuth(response.data)
    } catch (err) {
        console.log(err)
        throw err
    }
}

const performLogout = () => {
    const logout = useAuth.getState().setAuth
    logout()
}

instance.interceptors.response.use(
    async (response) => {
        return response
    },
    async (error) => {

        if (error.response.status === 403) {
            try {
                await refreshToken()
                return instance.request(error.config)
            } catch (err) {
                performLogout()
            }
        }

        return Promise.reject(error)
    }
)

export default instance