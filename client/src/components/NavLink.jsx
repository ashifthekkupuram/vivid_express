import React from 'react'

const NavLink = ({ text }) => {
  return (
    <div className='text-black text-xs font-medium p-2 transition-all hover:bg-primary hover:rounded-md hover:text-white'>
      { text }
    </div>
  )
}

export default NavLink
