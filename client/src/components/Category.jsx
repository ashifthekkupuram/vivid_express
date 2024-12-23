import React from 'react'

import { AiOutlineClose } from "react-icons/ai"
import useBlogFilter from '../state/useBlogFilter'

{/* <AiOutlineClose className='text-xs font-medium mr-1' /> */}

const Category = ({ category }) => {

  const categories = useBlogFilter((state) => state.categories)
  const addRemoveCategory = useBlogFilter((state) => state.addRemoveCategory)

  // Select Category
  const onClick = () => {
    addRemoveCategory(category._id)
  }

  return (
    <div className={`${ categories.includes(category._id) ? 'selected-category' : 'category' }`} onClick={onClick}>
      {categories.includes(category._id) &&<AiOutlineClose className='text-xs font-medium mr-1' />} { category.name }
    </div>
  )
}

export default Category
