import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useDeleteComment = () => {
  
    const [loading, setLoading] = useState(false)

    const delete_comment = async (commentId) => {
        setLoading(true)
        try{
            const response = await api.delete(`/comment/${commentId}`)
            toast.success(response.data.message)
            return 'success'
        } catch(err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return [ loading, delete_comment ]
}

export default useDeleteComment
