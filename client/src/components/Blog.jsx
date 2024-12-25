import React from 'react'
import ReactQuill from 'react-quill'

import Avatar from '../assets/images/avatar.jpg'

const Blog = ({ blog }) => {
  return (
    <div className='flex flex-col w-full bg-white-variant rounded-lg border border-primary py-3 px-4 md:px-12'>
      <div className='flex flex-row justify-start items-center gap-3 mb-3'>
        <img className='w-10 h-10 rounded-full' src={blog.author.profile || Avatar} alt="" />
        <h1 className='text-lg capitalize text-[#808080] '>{blog.author.name.firstName} {blog.author.name.secondName}</h1>
      </div>
      <h1 className='text-4xl font-normal capitalize mb-2'>
        {blog.title}
      </h1>
      <p className='font-extralight normal-case text-[#808080] text-wrap mb-3'>

        {blog.content}...
      </p>
      
      <div className='flex flex-row gap-2 mb-2'>
        {blog.categories.map((cat) => <div className='selected-category'>{cat.name}</div>)}
      </div>
      <hr />
    </div>
  )
}

export default Blog
