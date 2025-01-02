import React from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { MdOutlineDelete } from 'react-icons/md'
import { MdOutlineModeEdit } from "react-icons/md"

import Avatar from '../assets/images/avatar.jpg'
import useDeleteComment from '../hooks/useDeleteComment'
import useAuth from '../state/useAuth'

const Comment = ({ comment, setEditComment, setComment, setShowComments }) => {

    const queryClient = useQueryClient()

    const { loading, delete_comment } = useDeleteComment()

    const UserData = useAuth((state) => state.UserData)

    const onDeleteComment = async () => {
        const res = await delete_comment(comment._id)
        if (res === 'success') {
            await queryClient.refetchQueries({ queryKey: ['comments', comment.blog], type: 'active' })
        }
    }

    const onEditComment = () => {
        setEditComment({ edit: true, commentId: comment._id })
        setComment(comment.content)
        setShowComments({ show: false, blogId: '' })
    }

    return (
        <div className='flex flex-col w-full bg-white-variant rounded-lg border border-primary py-3 px-4'>
            <div className='flex flex-row justify-between items-center'>
                <div className='flex justify-start items-center gap-3 mb-3'>
                    <img className='w-10 h-10 rounded-full' src={comment?.author?.profile ? `${import.meta.env.VITE_PROFILE_URL}/${comment.author.profile}` : Avatar} alt="" />
                    <h1 className='text-lg capitalize text-[#808080] '>{comment?.author?.name?.firstName} {comment?.author?.name?.secondName}</h1>
                </div>
                <div className='flex flex-row gap-2'>
                    {UserData?._id === comment.author._id && <MdOutlineDelete className='text-xl' onClick={() => !loading && onDeleteComment()} />}
                    {UserData?._id === comment.author._id && <MdOutlineModeEdit className='text-xl' onClick={() => onEditComment()} />}
                </div>
            </div>
            <div className='font-extralight normal-case text-[#808080] overflow-hidden break-words'>
                {comment?.content}
            </div>
        </div>
    )
}

export default Comment
