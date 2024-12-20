import React,{ useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import NavBar from './NavBar'
import useRefresh from '../hooks/useRefresh'

const AuthWrapper = () => {

  const [ loading, refresh ] = useRefresh()

  useEffect(() => {
    refresh()
  },[])

  return (
    <div className='flex flex-col'>
      <NavBar />
      <Outlet />
    </div>
  )
}

export default AuthWrapper
