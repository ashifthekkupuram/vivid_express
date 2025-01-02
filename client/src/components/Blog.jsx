import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { AiOutlineComment } from "react-icons/ai"
import { MdOutlineDelete } from "react-icons/md"
import { MdOutlineEdit } from "react-icons/md"

import Avatar from '../assets/images/avatar.jpg'
import useAuth from '../state/useAuth'

const removeHTMLTags = (html) => {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

const Blog = ({ blog }) => {

  const navigate = useNavigate()

  const UserData = useAuth((state) => state.UserData)

  const onViewBlog = () => {
    navigate(`/view-blog/${blog._id}`)
  }

  const onViewUser = () => {
    navigate(`/u/${blog.author.username}`)
  }

  const onUpdateBlog = () => {
    navigate(`/update-blog/${blog._id}`)
  }
  
  const onDeleteBlog = () => {
    navigate(`/delete-blog/${blog._id}`)
  }

  return (
    <div className='flex flex-col w-full bg-white-variant rounded-lg border border-primary py-3 px-4 md:px-12'>
      <div className='flex flex-row justify-start items-center gap-3 mb-3 hover:cursor-pointer' onClick={onViewUser}>
        <img className='w-10 h-10 rounded-full' src={blog.author.profile ?  `${import.meta.env.VITE_PROFILE_URL}/${blog.author.profile}` : Avatar} alt="" />
        <h1 className='text-lg capitalize text-[#808080] '>{blog.author.name.firstName} {blog.author.name.secondName}</h1>
      </div>
      <h1 className='text-2xl font-normal capitalize mb-2 text-wrap overflow-hidden md:text-4xl hover:cursor-pointer' onClick={onViewBlog}>
        {blog.title}
      </h1>
      <div className='text-sm font-extralight normal-case text-[#808080] overflow-hidden break-words line-clamp-2 mb-3 md:text-base md:line-clamp-4 hover:cursor-pointer' onClick={onViewBlog}>

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
          <div className='text-sm font-semibold'>{blog.likes.length}</div>
          <div className='text-sm font-semibold'>Likes</div>
          <AiOutlineComment className='text-xl ml-2 hover:cursor-pointer' />
        </div>
        {
          UserData._id === blog.author._id &&
          <div className='flex flex-row item-center justify-center gap-1'>
            <MdOutlineEdit className='text-xl hover:cursor-pointer' onClick={onUpdateBlog} />
            <MdOutlineDelete className='text-xl hover:cursor-pointer' onClick={onDeleteBlog} />
          </div>
        }
      </div>
    </div>
  )
}

export default Blog
