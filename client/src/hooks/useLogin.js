import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useAuth from '../state/useAuth'
import api from '../api/axios'

const useLogin = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setAuth = useAuth((state) => state.setAuth)

    const navigate = useNavigate()

    const login = async (email, password) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/auth/login', { email, password })
            navigate('/')
            setAuth(response.data)
            toast.success(response.data.message)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Internal Server Error')
            setAuth()
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, login }
}

export default useLogin
