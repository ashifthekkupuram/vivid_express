import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import api from '../api/axios'

const ViewBlog = () => {

    const { blogId } = useParams()
    const navigate = useNavigate()

    const { data: blog } = useQuery({
        queryKey: [blog, blogId],
        queryFn: async () => {
            const response = await api.get(`/blog/${blogId}`)
            return response.data.blog
        },
        throwOnError: (error) => {
            navigate('/')
            navigate.error(error?.response?.data?.message || 'Internal Server Error')
        }
    })

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col justify-start items-center p-4 bg-white rounded-2xl gap-2'>
                <div className='flex flex-row justify-start items-center gap-3 mb-3'>
                    <img className='w-10 h-10 rounded-full' src={blog && blog.author.profile || Avatar} alt="" />
                    <h1 className='text-lg capitalize text-[#808080] '>{blog && blog.author.name.firstName} {blog && blog.author.name.secondName}</h1>
                </div>
                <h1 className='text-4xl font-normal capitalize mb-2 text-wrap overflow-hidden'>
                    {blog && blog.title}
                </h1>
            </div>
            <div className='flex flex-row justify-start items-center p-4 bg-white rounded-2xl gap-2'>
                {blog && blog.categories.map((cat) => <div key={cat._id} className='selected-category'>{cat.name}</div>)}
            </div>
            <div className='flex flex-col justify-start items-center p-4 bg-white rounded-2xl gap-2'>
                {blog && blog.content}
            </div>
        </div>
    )
}

export default ViewBlog
