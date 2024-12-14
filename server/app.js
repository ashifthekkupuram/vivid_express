import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

// App Configuration
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    return res.json({ success: true, message: 'Working...'})
})

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})