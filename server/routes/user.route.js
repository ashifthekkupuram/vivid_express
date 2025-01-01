import express from 'express'

import { get_user ,change_name, change_username, change_password, change_profile, remove_profile } from '../controllers/user.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'
import profileUploader from '../utils/profileUploader.js'

const Router = express.Router()

Router.get('/:username', get_user)

Router.post('/change_name', isAuthenticated, change_name)
Router.post('/change_username', isAuthenticated, change_username)
Router.post('/change_password', isAuthenticated, change_password)
Router.post('/change_profile', isAuthenticated, profileUploader, change_profile)
Router.delete('/remove_profile', isAuthenticated, remove_profile)

export default Router