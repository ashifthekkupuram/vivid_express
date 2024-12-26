import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import axios from '../api/axios'

const useUpdateBlog = () => {
  
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const update_blog = async (blogId, title, content) => {
        setLoading(true)
        try{
            const response = await axios.put(`/blog/${blogId}`, { title: title.trim(), content: content.trim()})
            navigate('/')
            toast.success(response.data.message)
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, update_blog ]
}

export default useUpdateBlog
