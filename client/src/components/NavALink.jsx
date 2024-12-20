import React from 'react'

const NavALink = ({ text, href }) => {
  return (
    <a className='text-md text-primary font-medium transition-all hover:text-lg hover:text-[#111b38]' href={href}>
      { text }
    </a>
  )
}

export default NavALink
