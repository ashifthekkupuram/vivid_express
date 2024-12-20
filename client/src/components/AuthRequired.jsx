import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../state/useAuth'

const AuthRequired = () => {

  const token = useAuth((state) => state.token)

  return (
    token ? <Outlet /> : <Navigate to='/login' />
  )
}

export default AuthRequired
