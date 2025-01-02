import { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useAddComment = () => {

    const [loading, setLoading] = useState(false)

    const add_comment = async (blogId, comment) => {
        setLoading(true)
        try {
            const response = await api.post(`/comment/${blogId}`, { content: comment.trim() })
            toast.success(response.data.message)
            return 'success'
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Internal Server Error')
        } finally {
            setLoading(false)
        }
    }

    return { loading, add_comment }
}

export default useAddComment
