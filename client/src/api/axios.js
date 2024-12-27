import axios from 'axios'

import useAuth from '../state/useAuth'
import useRefresh from '../hooks/useRefresh'
import useLogout from '../hooks/useLogout'

const baseURL = import.meta.env.VITE_API_URL

const instance = axios.create({
    baseURL,
    withCredentials: true
})

instance.interceptors.request.use(
    async (config) => {
        const token = useAuth.getState().token || ''
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
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
        // let alreadyRefreshed = false
        // if(!alreadyRefreshed){
        //     if(error.status === 403){
        //         const [loading, refresh] = useRefresh()
        //         refresh()
        //         alreadyRefreshed = true
        //         return instance.request(error.config)
        //     }
        // }
        return Promise.reject(error)
    }
)

export default instance