import express from 'express'

import { get_comments, create_comment, update_comment, delete_comment } from '../controllers/comment.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import isCommenter from '../middlewares/isCommenter.js'
import isAuthorOrCommenter from '../middlewares/isAuthorOrCommenter.js'

const Router = express.Router()

Router.get('/:blogId', get_comments)
Router.post('/:blogId', isAuthenticated, create_comment)
Router.put('/:commentId', isAuthenticated, isCommenter, update_comment)
Router.delete('/:commentId', isAuthenticated, isAuthorOrCommenter, delete_comment)

export default Router