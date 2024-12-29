import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useEditComment = () => {
  
    const [editLoading, setLoading] = useState(false)

    const edit_comment = async (commentId, comment) => {
        setLoading(true)
        try{
            const response = await api.put(`/comment/${commentId}`, { content: comment.trim() })
            toast.success(response.data.message)
            return 'success'
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ editLoading, edit_comment ]
}

export default useEditComment
