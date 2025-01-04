import React, { useEffect } from 'react'
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { MdClose } from "react-icons/md"

import api from '../api/axios'
import Comment from './Comment'
import Spinner from './Spinner'

const CommentsModel = ({ blogId, setShowComments, setEditComment, setComment }) => {

    const { ref, inView } = useInView()

    const { data: comments, status, error, fetchNextPage } = useInfiniteQuery({
        queryKey: ['comments', blogId],
        queryFn: async ({ pageParam = 1 }) => {
            const response = await api.get(`/comment/${blogId}`, { params: { page: pageParam } })
            return response.data
        },
        getNextPageParam: (lastPage, pages) =>
            lastPage.hasNextPage ? pages.length + 1 : undefined,
    })

    const onClose = () => {
        setShowComments({ show: false, blogId: '' })
    }

    useEffect(() => {
        if(inView) fetchNextPage()
    },[fetchNextPage, inView])

    return (
        <div id="modal" className="fixed inset-0 flex items-center justify-center bg-[#424242] bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-96 my-1 overflow-auto">
                <div className='sticky top-0 flex flex-row justify-between items-between w-full mb-2'>
                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <MdClose className='text-2xl rounded-full transition-all hover:bg-[#424242] hover:text-white hover:cursor-pointer' onClick={onClose} />
                </div>
                <div className="flex flex-col justify-start items-center gap-2 w-full">
                    {status === 'loading' ? <Spinner /> : status === 'error' ? <div className='text-xl font-semibold text-error self-center justify-self-center'>{error.response.data.message || 'Internal Server Error'}</div> : comments.pages.map((page) =>
                        <>
                            { page.data.map((comment) => <Comment key={comment._id} comment={comment} setEditComment={setEditComment} setComment={setComment} setShowComments={setShowComments} /> ) }
                        </>)}
                        <div ref={ref} ></div>
                </div>
            </div>
        </div>
    )
}

export default CommentsModel
