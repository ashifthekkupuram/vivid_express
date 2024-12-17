import express from 'express'

import { change_name, change_username, change_password } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express.Router()

Router.post('/change_name', isAuthenticated, change_name)
Router.post('/change_username', isAuthenticated, change_username)
Router.post('/change_password', isAuthenticated, change_password)

export default Router