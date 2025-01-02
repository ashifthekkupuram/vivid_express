import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import NavBar from './NavBar'
import useRefresh from '../hooks/useRefresh'

const AuthWrapper = () => {

  const { loading, refresh } = useRefresh()

  useEffect(() => {
    refresh()
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <NavBar />
      <Outlet />
      <Toaster position='top-right' />
    </div>
  )
}

export default AuthWrapper
