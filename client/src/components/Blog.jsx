import React from 'react'

const Blog = ({ blog }) => {
  return (
    <div className='flex flex-col w-full bg-white-variant rounded-lg border border-primary py-3 px-4'>
      <h1 className='text-4xl font-semibold capitalize mb-2'>
        {blog.title}
      </h1>
      <p className='font-extralight normal-case text-[#808080] text-wrap'>
        {blog.content}...
      </p>
      <div className='flex flex-col gap-2'>
        {blog.categories.map((cat) => <div className='category'>{cat.name}</div>)}
      </div>
    </div>
  )
}

export default Blog
