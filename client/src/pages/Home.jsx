import React from 'react'
import { useQuery } from '@tanstack/react-query'

import useBlogFilter from '../state/useBlogFilter'
import Category from '../components/Category'
import Blog from '../components/Blog'
import Spinner from '../components/Spinner'

import axios from '../api/axios'

const Home = () => {

  const selectedCategories = useBlogFilter((state) => state.categories)
  const search = useBlogFilter((state) => state.search)
  const setSearch = useBlogFilter((state) => state.setSearch)

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await axios.get('/category',)
      return response.data.categories
    }
  })

  const { data: blogs, isLoading } = useQuery({
    queryKey: ['blogs', search, selectedCategories],
    queryFn: async () => {
      const response = await axios.get('/blog', { params: { search: search.trim(), categories: selectedCategories } })
      setTimeout(() => {}, 5000)
      return response.data.blogs
    }
  })

  return (
    <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
      {/* Search Section */}
      <div className='flex justify-start items-center p-2 bg-white rounded-2xl'>
        <input value={search} type="text" className='shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
      </div>
      {/* Category Section */}
      <div className='flex justify-start items-center gap-2 p-2 w-full bg-white rounded-2xl scroll-container overflow-auto'>
        {categories && categories.map((cat) => <Category key={cat._id} category={cat} />)}
      </div>
      {/* Blog Section */}
      <div className='flex flex-col justify-start items-center gap-2 p-2 h-full bg-white rounded-2xl overflow-auto scroll-container'>
        {isLoading ? <Spinner /> :  (blogs.length > 0 ? blogs.map((blog) => <Blog key={blog._id} blog={blog} />) : <div className='text-xl font-semibold text-[#808080] self-center justify-self-center'>No Blogs Found</div>) }
      </div>
    </div>
  )
}

export default Home
