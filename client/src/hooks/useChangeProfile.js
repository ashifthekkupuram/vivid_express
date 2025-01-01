import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useAuth from '../state/useAuth'
import api from '../api/axios'

const useChangeProfile = () => {
  
    const [loading, setLoading] = useState(false)

    const setUserData = useAuth((state) => state.setUserData)

    const navigate = useNavigate()

    const change_profile = async (profile) => {
        setLoading(true)
        try{
            const response = await api.post('/user/change_profile', profile)
            setUserData(response.data.UserData)
            navigate('/profile')
            toast.success(response.data.message)
        } catch(err) {
            toast.error(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, change_profile ]
}

export default useChangeProfile
