import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

import api from '../api/axios'
import Avatar from '../assets/images/avatar.jpg'
import HtmlConverter from '../components/HtmlConverter'
import CommentsModel from '../components/CommentsModel'
import useAddComment from '../hooks/useAddComment'

const ViewBlog = () => {

    const [showComments, setShowComments] = useState({
        show: false,
        blogId: ''
    })
    const [comment, setComment] = useState('')

    const { blogId } = useParams()
    const navigate = useNavigate()

    const [loading, add_comment] = useAddComment()

    const { data: blog } = useQuery({
        queryKey: ['blog', blogId],
        queryFn: async () => {
            const response = await api.get(`/blog/${blogId}`)
            return response.data.blog
        },
        throwOnError: (error) => {
            navigate('/')
            toast.error(error?.response?.data?.message || 'Internal Server Error')
        }
    })

    const onAddComment = async () => {
            const res = await add_comment(blog._id, comment)
            if(res === 'success'){
                setComment('')
            }
    }

    const addCommentDisabled = loading || !comment.trim()

    return (
        <>
            <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
                <div className='flex flex-col justify-start items-start p-4 bg-white rounded-2xl gap-2'>
                    <div className='flex flex-row justify-center items-center gap-3'>
                        <img className='w-10 h-10 rounded-full' src={blog && blog.author.profile || Avatar} alt="" />
                        <h1 className='text-lg capitalize text-[#808080] '>{blog && blog.author.name.firstName} {blog && blog.author.name.secondName}</h1>
                    </div>
                    <h1 className='text-4xl font-normal capitalize mb-2 text-wrap overflow-hidden'>
                        {blog && blog.title}
                    </h1>
                    <div className='flex  fle-row gap-2 mb-2'>
                        {blog && blog.categories.map((cat) => <div key={cat._id} className='selected-category'>{cat.name}</div>)}
                    </div>
                    <div className='text-xs text-[#808080]'>
                        {blog && `created at ${format(blog.createdAt, 'LLLL do, y')}`}
                    </div>
                </div>
                <div className='h-full p-4 bg-white rounded-2xl overflow-auto'>
                    {blog && <HtmlConverter content={blog.content} />}
                </div>
                <div className='flex flex-col justify-start items-start p-2 bg-white rounded-2xl gap-2'>
                    <textarea value={comment} className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" placeholder='Comment something...' onChange={(e) => setComment(e.target.value)}  />
                    <div className='flex flex-row gap-2'>
                        <button disabled={addCommentDisabled} className='primary-btn bg' onClick={onAddComment}>Send Comment</button>
                        <button className='primary-btn' onClick={() => setShowComments({ show: true, blogId: blog._id })}>View Comments</button>
                    </div>
                </div>
            </div>
            {showComments.show && <CommentsModel setShowComments={setShowComments} blogId={showComments.blogId} />}
        </>
    )
}

export default ViewBlog
