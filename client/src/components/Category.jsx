import React from 'react'

import { AiOutlineClose } from "react-icons/ai"

{/* <AiOutlineClose className='text-xs font-medium mr-1' /> */}

const Category = ({ category }) => {
  return (
    <div className='category'>
      { category }
    </div>
  )
}

export default Category
