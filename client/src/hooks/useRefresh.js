import { useState, useEffect } from 'react'

import useAuth from '../state/useAuth'
import axios from '../api/axios'

const useRefresh = () => {
  
    const [loading, setLoading] = useState(false)

    const setAuth = useAuth((state) => state.setAuth)

    const refresh = async () => {
        setLoading(true)
        setError(null)
        try{
            const response = axios.post('/refresh')
            setError(null)
            setAuth(response.data)
        } catch(err) {
            
            setAuth()
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refresh()
    },[])

    return [ loading ]
}

export default useRefresh
