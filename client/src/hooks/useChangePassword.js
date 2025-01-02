import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useChangePassword = () => {
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const change_password = async (oldPassword, newPassword) => {
        setLoading(true)
        setError(null)
        try{
            const response = await api.post('/user/change_password', { oldPassword, newPassword })
            navigate('/profile')
            toast.success(response.data.message)
            setError(null)
        } catch(err) {
            setError(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, change_password }
}

export default useChangePassword
