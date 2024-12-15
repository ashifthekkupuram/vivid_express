import express from 'express'

import { get_blogs, get_blog, create_blog, update_blog, delete_blog } from '../controllers/blog.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isAuthor from '../middlewares/isAuthor.js'


const Router = express.Router()

Router.get('/', get_blogs)
Router.post('/', isAuthenticated, create_blog)

Router.get('/:blogId', get_blog)
Router.put('/:blogId', isAuthenticated, isAuthor, update_blog)
Router.delete('/:blogId', isAuthenticated, isAuthor, delete_blog)

export default Router