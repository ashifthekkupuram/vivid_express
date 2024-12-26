import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'

const useDeleteBlog = () => {
  
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const delete_blog = async (blogId) => {
        setLoading(true)
        try{
            const response = await axios.delete(`/blog/${blogId}`)
            navigate('/')
            toast.success(response.data.message)
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, delete_blog ]
}

export default useDeleteBlog
