import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import AuthWrapper from './components/AuthWrapper'
import Login from './pages/Login'
import Home from './pages/Home'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'

function App() {

  const router = createBrowserRouter([{
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/',
        element: <AuthRedirect />,
        children: [
          {
            path: '/login',
            element: < Login />
          }
        ]
      },
    ]
  }])

  return (
    <RouterProvider router={router} />
  )
}

export default App
