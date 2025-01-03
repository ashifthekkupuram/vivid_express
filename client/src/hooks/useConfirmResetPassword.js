import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useConfirmResetPassword = () => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const confirm_reset_password = async (token, newPassword) => {
        setLoading(true)
        setError(null)
        try {
            const response = await api.put(`/resetPassword/${token}`, { newPassword })
            navigate('/login')
            toast.success(response.data.message)
            setError(null)
        } catch (err) {
            setError(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, error, confirm_reset_password }
}

export default useConfirmResetPassword
