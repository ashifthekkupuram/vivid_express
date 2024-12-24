import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'

const useCreateBlog = () => {
  
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const create_blog = async (title, content) => {
        setLoading(true)
        try{
            const response = await axios.post('/blog', { title: title.trim(), content: content.trim() })
            navigate('/')
            toast.success(response.data.message)
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, create_blog ]
}

export default useCreateBlog
