import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useRegister = () => {
  
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const register = async (email, firstName, secondName, password) => {
        setLoading(true)
        setError(null)
        try{
            const response = await api.post('/auth/register', { email: email?.trim(), firstName: firstName?.trim(), secondName: secondName?.trim(), password })
            toast.success(response.data.message)
            setError(null)
            navigate('/login')
        } catch(err) {
            console.log(err)
            setError(err.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, error, register ]
}

export default useRegister
