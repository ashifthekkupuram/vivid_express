import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

import ConnectDatabase from './config/database.js'

import AuthRouter from './routes/auth.route.js'
import BlogRouter from './routes/blog.route.js'
import CommentRouter from './routes/comment.route.js'
import UserRouter from './routes/user.route.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// App Configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/auth', AuthRouter)
app.use('/api/blog', BlogRouter)
app.use('/api/comment', CommentRouter)
app.use('/api/user', UserRouter)

app.listen(PORT, () => {
    ConnectDatabase().then(()=>{
        console.log('Database Connected...')
    })
    console.log(`Server running on ${PORT}...`)
})