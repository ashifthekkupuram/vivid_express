import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthWrapper from './components/AuthWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import AuthRedirect from './components/AuthRedirect'

function App() {

  const queryClient = new QueryClient()

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
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
        ]
      },
    ]
  }])

  return (
    <QueryClientProvider client={queryClient} >
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
