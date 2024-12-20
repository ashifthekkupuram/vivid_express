import React, { useState } from 'react'

import { RiMenu3Fill } from 'react-icons/ri'
import NavLink from './NavLink'
import NavALink from './NavALink'

const NavBar = () => {

  const [menu, setMenu] = useState(false)

  return (
    <div className='flex sticky justify-between items-center bg-secondary w-full h-14 py-2 px-2 md:px-8'>
      <h1 className='text-primary text-lg font-bold italic tracking-wide'>VIVID EXPRESS</h1>
      <div className='hidden md:flex items-center gap-2'>
        <NavALink text='Home' href='./' />
        <div className='border-x border-primary h-4'></div>
        <NavALink text='Write' href='./' />
        <div className='border-x border-primary h-4'></div>
        <NavALink text='About' href='./' />
      </div>
      <div className='flex gap-2'>
        <button className='hidden primary-btn md:block'>Login</button>
        <button className='hidden primary-btn md:block'>Register</button>
        <RiMenu3Fill className='text-3xl text-primary font-bold hover:text-[#111b38] hover:cursor-pointer md:hidden' onClick={() => setMenu(prev => !prev)} />
        {menu &&
          <div className='flex flex-col gap-1 absolute top-12 right-6 bg-secondary-variant p-2 rounded-md border-primary md:hidden'>
            <NavLink text='Home' />
            <NavLink text='Write' />
            <NavLink text='About' />
            <hr className='bg-primary' />
            <div className='flex gap-2'>
            <button className='primary-btn'>Login</button>
            <button className='primary-btn'>Register</button>
            </div>
          </div>}
      </div>
    </div>
  )
}

export default NavBar
