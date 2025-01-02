import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns'

import Avatar from '../assets/images/avatar.jpg'
import Spinner from '../components/Spinner'
import Blog from '../components/Blog'
import api from '../api/axios'

const UserPage = () => {

    const { username } = useParams()

    const { data: user } = useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const response = await api.get(`/user/${username}`)
            return response.data.user
        }
    })

    const { data: blogs, isLoading } = useQuery({
        queryKey: ['blogs', user?._id],
        queryFn: async () => {
            const response = await api.get(`/blog/`, { params: { userId: user?._id } })
            return response.data.blogs
        }
    })


    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col md:flex-row justify-start items-center gap-4 p-2 bg-white rounded-2xl py-3 px-4 md:px-12'>
                {/* Profile Section */}
                <div className='flex items-center gap-4'>
                    <img className='h-32 w-32 rounded-full border-2 border-primary' src={user?.profile ? `${import.meta.env.VITE_PROFILE_URL}/${user?.profile}` : Avatar } alt="" />
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <h1 className='text-2xl capitalize font-semibold text-black  '>{user?.name?.firstName} {user?.name?.secondName}</h1>
                    <span className='text-[#808080]'>joined at {user && format(user?.createdAt, 'LLLL do, y')}</span>
                </div>

            </div>
            {/* Blog Section */}
            <div className='flex flex-col justify-start items-center gap-2 p-2 h-full bg-white rounded-2xl overflow-auto scroll-container'>
                {isLoading ? <Spinner /> : (blogs.length > 0 ? blogs.map((blog) => <Blog key={blog._id} blog={blog} />) : <div className='text-xl font-semibold text-[#808080] self-center justify-self-center'>No Blogs Found</div>)}
            </div>
        </div>
    )
}

export default UserPage
