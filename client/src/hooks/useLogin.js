import { useState } from 'react'

import useAuth from '../state/useAuth'
import axios from '../api/axios'

const useLogin = () => {
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        try{
            const response = await axios.post('/auth/login', { email, password })
            setAuth(response.data)
            setError(null)
        } catch(err) {
            setError(err.response?.data?.message || 'Internal Server Error')
            setAuth()
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, login }
}

export default useLogin
