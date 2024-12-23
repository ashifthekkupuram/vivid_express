import express from 'express'

import { get_categories, create_category } from '../controllers/category.controller.js'
import isAuthenticated from '../middlewares/isAuthenticated.js'

const Router = express.Router()

Router.get('/', get_categories)
Router.post('/',isAuthenticated, create_category)


export default Router