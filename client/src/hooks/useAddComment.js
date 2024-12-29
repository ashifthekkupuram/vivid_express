import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useAddComment = () => {
  
    const [addLoading, setLoading] = useState(false)

    const add_comment = async (blogId, comment) => {
        setLoading(true)
        try{
            const response = await api.post(`/comment/${blogId}`, { content: comment.trim() })
            toast.success(response.data.message)
            return 'success'
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ addLoading, add_comment ]
}

export default useAddComment
