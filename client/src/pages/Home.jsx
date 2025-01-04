import React, { useEffect } from 'react'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'

import useBlogFilter from '../state/useBlogFilter'
import Category from '../components/Category'
import Blog from '../components/Blog'
import Spinner from '../components/Spinner'

import api from '../api/axios'
import { data } from 'react-router-dom'

const Home = () => {

  const selectedCategories = useBlogFilter((state) => state.categories)
  const search = useBlogFilter((state) => state.search)
  const setSearch = useBlogFilter((state) => state.setSearch)

  const { ref, inView } = useInView()

  const { data: categories } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const response = await api.get('/category',)
      return response.data.categories
    },
  })

  const { data: blogs, status, error, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['blogs', search, selectedCategories],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await api.get('/blog', { params: { search: search.trim(), categories: selectedCategories, page: pageParam } })
      return response.data
    },
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasNextPage ? pages.length + 1 : undefined,

  })

  useEffect(() => {
    if (inView) fetchNextPage()
  }, [fetchNextPage, inView])

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
        {status === 'loading' ? <Spinner /> : status === 'error' ? <div className='text-xl font-semibold text-error self-center justify-self-center'>{error.response.data.message || 'Internal Server Error'}</div> : blogs.pages.map((page, index) => {
          return <React.Fragment key={index}>
            {page.data.map((blog) => {
              return <Blog key={blog._id} blog={blog} />
            })}
          </React.Fragment>
        })}
        <div ref={ref}></div>
        {isFetchingNextPage && <Spinner />}
      </div>
    </div>
  )
}

export default Home
