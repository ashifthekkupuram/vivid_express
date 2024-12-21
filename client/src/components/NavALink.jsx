import React from 'react'

const NavALink = ({ text, onClick }) => {
  return (
    <div className='text-md text-primary font-medium transition-all hover:text-lg hover:text-[#111b38] hover:cursor-pointer' onClick={onClick}>
      { text }
    </div>
  )
}

export default NavALink
