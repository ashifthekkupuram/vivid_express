import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useAuth from '../state/useAuth'
import api from '../api/axios'

const useChangeUsername = () => {
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const setUserData = useAuth((state) => state.setUserData)

    const navigate = useNavigate()

    const change_username = async (username) => {
        setLoading(true)
        setError(null)
        try{
            const response = await api.post('/user/change_username', { username })
            setUserData(response.data.UserData)
            navigate('/profile')
            toast.success(response.data.message)
            setError(null)
        } catch(err) {
            setError(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, error, change_username ]
}

export default useChangeUsername
