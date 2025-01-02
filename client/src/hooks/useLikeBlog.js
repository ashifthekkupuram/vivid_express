import React, { useState } from 'react'
import toast from 'react-hot-toast'

import api from '../api/axios'

const useLikeBlog = () => {

    const [loading, setLoading] = useState(false)

    const like_blog = async (blogId) => {
        setLoading(false)
        try {
            await api.post(`blog/like/${blogId}`)
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Internal Server')
        } finally {
            setLoading(false)
        }
    }

    return { loading, like_blog }
}

export default useLikeBlog
