import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { format } from 'date-fns'

import Avatar from '../assets/images/avatar.jpg'
import Spinner from '../components/Spinner'
import Blog from '../components/Blog'
import api from '../api/axios'

const UserPage = () => {

    const { username } = useParams()

    const { ref, inView } = useInView() 

    const { data: user } = useQuery({
        queryKey: ['user', username],
        queryFn: async () => {
            const response = await api.get(`/user/${username}`)
            return response.data.user
        }
    })

    const { data: blogs, status, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['blogs', user?._id],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get(`/blog/`, { params: { userId: user?._id, page: pageParam } })
            return response.data
        },
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasNextPage ? pages.length + 1 : undefined,
    })

    useEffect(() => {
        if(inView) fetchNextPage()
    }, [fetchNextPage, inView])

    return (
        <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
            <div className='flex flex-col md:flex-row justify-start items-center gap-4 p-2 bg-white rounded-2xl py-3 px-4 md:px-12'>
                {/* Profile Section */}
                <div className='flex items-center gap-4'>
                    <img className='h-32 w-32 rounded-full border-2 border-primary' src={user?.profile ? `${import.meta.env.VITE_PROFILE_URL}/${user?.profile}` : Avatar} alt="" />
                </div>
                <div className='flex flex-col justify-center items-center '>
                    <h1 className='text-2xl capitalize font-semibold text-black  '>{user?.name?.firstName} {user?.name?.secondName}</h1>
                    <span className='text-[#808080]'>joined at {user && format(user?.createdAt, 'LLLL do, y')}</span>
                </div>

            </div>
            {/* Blog Section */}
            <div className='flex flex-col justify-start items-center gap-2 p-2 h-full bg-white rounded-2xl overflow-auto scroll-container'>
                {status === 'loading' ? <Spinner /> : status === 'error' ? <div className='text-xl font-semibold text-error self-center justify-self-center'>{error.response.data.message || 'Internal Server Error'}</div> : blogs.pages.map((page, index) => {
                    return <React.Fragment key={index}>
                        {page.data.map((blog) => {
                            return <Blog key={blog._id} blog={blog} />
                        })}
                    </React.Fragment>
                })}
                {isFetchingNextPage && <Spinner />}
                <div ref={ref}></div>
            </div>
        </div>
    )
}

export default UserPage
