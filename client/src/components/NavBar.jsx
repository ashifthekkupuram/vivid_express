import React, { useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom'

import NavLink from './NavLink'
import NavALink from './NavALink'
import Avatar from '../assets/images/avatar.jpg'

import useAuth from '../state/useAuth'
import useLogout from '../hooks/useLogout'


const NavBar = () => {

  const [menu, setMenu] = useState(false)

  const token = useAuth((state) => state.token)
  const UserData = useAuth((state) => state.UserData)

  const { loading, logout } = useLogout()

  const navigate = useNavigate()

  const onNavigate = (link) => {
    setMenu(false)
    navigate(link)
  }

  const onLogout = () => {
    logout()
    setMenu(false)
  }

  return (
    <div className='flex sticky top-0 justify-between items-center bg-secondary w-full h-14 py-2 px-2 md:px-8'>
      <h1 className='text-primary text-lg font-bold italic tracking-wide'>VIVID EXPRESS</h1>
      <div className='hidden md:flex items-center gap-2'>
        <NavALink text='Home' onClick={() => navigate('/')} />
        <div className='border-x border-primary h-4'></div>
        <NavALink text='Write' onClick={() => token ? navigate('/create-blog') : navigate('/login')} />
        <div className='border-x border-primary h-4'></div>
        <NavALink text='About' onClick={() => navigate('/')} />
        {token && <>
          <div className='border-x border-primary h-4'></div>
          <NavALink text='Logout' onClick={() => onLogout()} />
        </>}
      </div>
      <div className='flex items-center gap-2'>
        {token ? <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => onNavigate('/profile')}>
          <img className='hidden md:block w-10 h-10 rounded-full border-2 border-primary transition-all hover:border-[#111b38]' alt='' src={UserData.profile ? `${import.meta.env.VITE_PROFILE_URL}/${UserData.profile}` : Avatar} />
          <h1 className='hidden md:block text-primary text-sm font-medium capitalize transition-all hover:text-[#111b38]'>{UserData?.name?.firstName} {UserData?.name?.secondName}</h1>
        </div> : <>
          <button className='hidden primary-btn md:block' onClick={() => navigate('/login')}>Login</button>
          <button className='hidden primary-btn md:block' onClick={() => navigate('/register')}>Register</button>
        </>}
        <RiMenu3Fill className='text-3xl text-primary font-bold hover:text-[#111b38] hover:cursor-pointer md:hidden' onClick={() => setMenu(prev => !prev)} />
        {menu &&
          <div className='flex flex-col gap-1 absolute top-12 right-6 bg-secondary-variant p-2 rounded-md border border-primary z-50 md:hidden'>
            <NavLink text='Home' onClick={() => onNavigate('/')} />
            <NavLink text='Write' onClick={() => token ? onNavigate('/create-blog') : onNavigate('/login')} />
            <NavLink text='About' onClick={() => onNavigate('/')} />
            {token && <>
              <NavLink text='Logout' onClick={() => logout()} />
            </>}
            <hr className='bg-primary' />
            <div className='flex items-center gap-2'>
              {token ? <div className='flex items-center gap-2 hover:cursor-pointer' onClick={() => onNavigate('/profile')}>
                <img className='w-8 h-8 rounded-full border-2 border-primary transition-all hover:border-[#111b38]' alt='' src={UserData.profile ? `${import.meta.env.VITE_PROFILE_URL}/${UserData.profile}` : Avatar} />
                <h1 className='text-primary text-xs font-medium capitalize transition-all hover:text-[#111b38]' >{UserData?.name?.firstName} {UserData?.name?.secondName}</h1>
              </div> : <>
                <button className='primary-btn' onClick={() => onNavigate('/login')}>Login</button>
                <button className='primary-btn' onClick={() => onNavigate('/register')}>Register</button>
              </>}
            </div>
          </div>}
      </div>
    </div>
  )
}

export default NavBar
