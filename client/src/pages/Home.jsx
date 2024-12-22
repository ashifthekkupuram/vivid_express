import React from 'react'

import useBlogFilter from '../state/useBlogFilter'
import Category from '../components/Category'

const Home = () => {

  const search = useBlogFilter((state) => state.search)
  const setSearch = useBlogFilter((state) => state.setSearch)

  return (
    <div className='flex flex-col gap-2 p-2 md:px-32 w-full h-full bg-secondary-variant'>
      {/* Search Section */}
      <div className='flex justify-start items-center p-2 bg-white rounded-2xl'>
        <input value={search} type="text" className='shadow appearance-none border rounded-xl w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' placeholder='Search...' onChange={(e) => setSearch(e.target.value)} />
      </div>
      {/* Category Section */}
      <div className='flex justify-start items-center gap-2 p-2 bg-white rounded-2xl overflow-hidden'>
        <Category category='Lifestyle' />
        <Category category='Fitness' />
        <Category category='Geography' />
        <Category category='Musics' />
        <Category category='Musics' />
        <Category category='Musics' />
        <Category category='Musics' />
        <Category category='Musics' />
      </div>
      {/* Blog Section */}
      <div className='flex flex-col justify-start items-center gap-2 p-2 h-full bg-white rounded-2xl overflow-hidden'>

      </div>
    </div>
  )
}

export default Home
