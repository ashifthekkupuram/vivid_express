import mongoose, { mongo } from 'mongoose'

const Schema = mongoose.Schema

const BlogSchema = new Schema({
    title: {
        type: String,
        minLength: 10,
        required: true
    },
    content: {
        type: String,
        minLength: 100,
        required: true
    },
    image: {
        type: String,
        default: ''
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: []
    }],
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }]
}, { timestamps: true })

export default mongoose.model('Blog', BlogSchema)