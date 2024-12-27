import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import useAuth from '../state/useAuth'
import api from '../api/axios'
import useDeleteBlog from '../hooks/useDeleteBlog'

const DeleteBlog = () => {

    const { blogId } = useParams()

    const UserData = useAuth((state) => state.UserData)
    const [loading, delete_blog] = useDeleteBlog()

    const navigate = useNavigate()

    const { data: blog, isLoading } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await api.get(`/blog/${blogId}`)
            return response.data.blog
        },
        throwOnError: (err) => {
            navigate('/')
            toast.error(err.response?.data?.message || 'Internal Server Error')
        }
    })

    useEffect(() => {
        if (blog) {
            if (blog.author._id !== UserData._id) {
                navigate('/')
                toast.error('Forbidden')
            }
        }
    }, [blogId, blog, UserData._id, navigate])

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-start items-center p-4 bg-white rounded-2xl gap-2'>
                {blog && <h1 className='text-4xl font-semibold capitalize mb-2 text-wrap overflow-hidden'>
                    Are you sure you wanna delete "<span className='font-light'>{blog.title}</span>" blog?
                </h1>}
                <div className='flex gap-2 self-end'>
                    <button className='primary-btn' onClick={() => navigate('/')}>Cancel</button>
                    <button className='primary-btn !bg-error' onClick={() => delete_blog(blogId)}>{loading ? <svg className='animate-spin h-5 w-5'></svg> : 'Delete' }</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteBlog
