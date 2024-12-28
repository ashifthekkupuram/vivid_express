import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { MdClose } from "react-icons/md"

import api from '../api/axios'
import Comment from './Comment'

const CommentsModel = ({ blogId, setShowComments }) => {

    const { data: comments } = useQuery({
        queryKey: ['comments', blogId],
        queryFn: async () => {
            const response = await api.get(`/comment/${blogId}`)
            return response.data.comments
        }
    })

    const onClose = () => {
        setShowComments({ show: false, blogId: '' })
    }

    return (
        <div id="modal" className="fixed inset-0 flex items-center justify-center bg-[#424242] bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-96 my-1 overflow-auto">
                <div className='sticky flex flex-row justify-between items-between w-full mb-2'>
                    <h2 className="text-xl font-bold mb-4">Comments</h2>
                    <MdClose className='text-2xl rounded-full transition-all hover:bg-[#424242] hover:text-white hover:cursor-pointer' onClick={onClose} />
                </div>
                <div className="flex flex-col justify-start items-center gap-2 w-full">
                    { comments && comments.length > 0 ? comments.map((comment) => <Comment key={comment._id} comment={comment} />) : <div className='text-xl font-semibold text-[#808080] self-center justify-self-center'>No Comment were added</div> }
                </div>
            </div>
        </div>
    )
}

export default CommentsModel
