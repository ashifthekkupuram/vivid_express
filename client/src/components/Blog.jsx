import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { AiOutlineLike } from "react-icons/ai"
import { AiFillLike } from "react-icons/ai"
import { AiOutlineComment } from "react-icons/ai"
import { MdOutlineDelete } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"
import { useQueryClient, useMutation } from '@tanstack/react-query'

import Avatar from '../assets/images/avatar.jpg'
import useAuth from '../state/useAuth'
import useLikeBlog from '../hooks/useLikeBlog'

const removeHTMLTags = (html) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

const Blog = ({ blog }) => {

  const UserData = useAuth((state) => state.UserData)
  const [loading, like_blog] = useLikeBlog()
  const queryClient = useQueryClient()

  const navigate = useNavigate()

  // const mutation = useMutation({
  //   mutationFn: like_blog,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['blogs'])
  //   }
  // })

  const onViewBlog = () => {
    navigate(`/view-blog/${blog._id}`)
  }

  return (
    <div className='flex flex-col w-full bg-white-variant rounded-lg border border-primary py-3 px-4 md:px-12'>
      <div className='flex flex-row justify-start items-center gap-3 mb-3'>
        <img className='w-10 h-10 rounded-full' src={blog.author.profile || Avatar} alt="" />
        <h1 className='text-lg capitalize text-[#808080] '>{blog.author.name.firstName} {blog.author.name.secondName}</h1>
      </div>
      <h1 className='text-4xl font-normal capitalize mb-2 text-wrap overflow-hidden' onClick={onViewBlog}>
        {blog.title}
      </h1>
      <div className='font-extralight normal-case text-[#808080] overflow-hidden break-words line-clamp-2 mb-3 md:line-clamp-4' onClick={onViewBlog}>

        {removeHTMLTags(blog.content)}...
      </div>

      <div className='flex flex-row gap-2 mb-2'>
        {blog.categories.map((cat) => <div key={cat._id} className='selected-category'>{cat.name}</div>)}
      </div>
      <div className='text-xs text-[#808080] mb-2'>
        created at {format(blog.createdAt, 'LLLL do, y')}
      </div>
      <hr className='mb-2' />
      <div className='flex flex-row justify-between items-center'>
        <div className='flex flex-row item-center justify-center gap-1'>
          {blog.likes.includes(UserData._id) ? <AiFillLike onClick={() => !loading && like_blog(blog._id)} className='text-xl hover:cursor-pointer' /> : <AiOutlineLike onClick={() => !loading && like_blog(blog._id)} className='text-xl hover:cursor-pointer' />}
          <div className='text-sm'>{blog.likes.length}</div>
          <AiOutlineComment className='text-xl ml-2 hover:cursor-pointer' />
        </div>
        <div className='flex flex-row item-center justify-center gap-1'>
          <MdOutlineEdit className='text-xl hover:cursor-pointer' onClick={() => navigate(`/update-blog/${blog._id}`)} />
          <MdOutlineDelete className='text-xl hover:cursor-pointer' onClick={() => navigate(`/delete-blog/${blog._id}`)} />
        </div>
      </div>
    </div>
  )
}

export default Blog
