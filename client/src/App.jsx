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
import ViewBlog from './pages/ViewBlog'
import UserPage from './pages/UserPage'
import Profile from './pages/Profile'
import ChangeUsername from './pages/ChangeUsername'
import ChangeName from './pages/ChangeName'
import ChangePassword from './pages/ChangePassword'
import ResetPassword from './pages/ResetPassword'
import ConfirmResetPassword from './pages/ConfirmResetPassword'
import AuthRedirect from './components/AuthRedirect'
import AuthRequired from './components/AuthRequired'
import { disableReactDevTools } from '@fvilers/disable-react-devtools'

function App() {

  const queryClient = new QueryClient()

  if(import.meta.env.VITE_NODE_ENV === 'production') disableReactDevTools()

  const router = createBrowserRouter([{
    path: '/',
    element: <AuthWrapper />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/view-blog/:blogId',
        element: <ViewBlog />
      },
      {
        path: '/u/:username',
        element: <UserPage />
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
          {
            path: '/reset-password',
            element: <ResetPassword />
          },
          {
            path: '/confirm-reset-password/:token',
            element: <ConfirmResetPassword />
          }
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
          },
          {
            path: '/profile',
            element: <Profile />
          },
          {
            path: '/change-username',
            element: <ChangeUsername />
          },
          {
            path: '/change-name',
            element: <ChangeName />
          },
          {
            path: '/change-password',
            element: <ChangePassword />
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
