import mongoose from 'mongoose'

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    content: {
        type: String,
        minLength: 10,
        required: true
    },
    blog: {
        type: Schema.Types.ObjectId,
        ref: 'Blog',
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Comment', CommentSchema)