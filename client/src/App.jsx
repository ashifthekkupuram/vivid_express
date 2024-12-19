import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Login from './pages/Login'
import useAuth from './state/useAuth'

function App() {

  const token = useAuth((state) => state.token)

  return (
    token ? <div>{token}</div> : <Login />
  )
}

export default App
