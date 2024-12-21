import { useState } from 'react'
import toast from 'react-hot-toast'

import useAuth from '../state/useAuth'
import axios from '../api/axios'

const useLogout = () => {
  
    const [loading, setLoading] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const logout = async () => {
        setLoading(true)
        try{
            await axios.post('/auth/logout')
            setAuth()
            toast.success('Logged out')
        } catch(err) {
            
        } finally {
            setLoading(false)
        }
    }

    return [ loading, logout ]
}

export default useLogout
