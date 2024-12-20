import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../state/useAuth'

const AuthRedirect = () => {

  const token = useAuth((state) => state.token)

  return (
    token ? <Navigate to='/'/> : <Outlet />
  )
}

export default AuthRedirect
