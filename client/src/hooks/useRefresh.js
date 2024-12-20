import { useState } from 'react'

import useAuth from '../state/useAuth'
import axios from '../api/axios'

const useRefresh = () => {
  
    const [loading, setLoading] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const refresh = async () => {
        setLoading(true)
        try{
            const response = await axios.post('/auth/refresh')
            setAuth(response.data)
        } catch(err) {
            setAuth()
        } finally {
            setLoading(false)
        }
    }

    return [ loading, refresh ]
}

export default useRefresh
