import React from 'react'

const NavLink = ({ text, onClick }) => {
  return (
    <div className='text-black text-xs font-medium p-2 transition-all hover:bg-primary hover:rounded-md hover:text-white hover:cursor-pointer' onClick={onClick}>
      { text }
    </div>
  )
}

export default NavLink
