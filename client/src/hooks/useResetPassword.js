import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useResetPassword = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const reset_password = async (email) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.post('/resetPassword', { email })
            navigate('/login')
            toast.success(response.data.message)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, reset_password }
}

export default useResetPassword
