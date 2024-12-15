import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGODB_URI = process.env.MONGODB_URI || ''

const ConnectDatabase = async () => {
    await mongoose.connect(MONGODB_URI)
}

export default ConnectDatabase