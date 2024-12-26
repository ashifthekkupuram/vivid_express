import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import AuthWrapper from './components/AuthWrapper'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import CreateBlog from './pages/CreateBlog'
import DeleteBlog from './pages/DeleteBlog'
import UpdateBlog from './pages/UpdateBlog'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'

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
      {
        path: '/',
        element: <AuthRequired />,
        children: [
          {
            path: '/create-blog',
            element: <CreateBlog />
          },
          {
            path: '/delete-blog/:blogId',
            element: <DeleteBlog />
          },
          {
            path: '/update-blog/:blogId',
            element: <UpdateBlog />
          }
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
