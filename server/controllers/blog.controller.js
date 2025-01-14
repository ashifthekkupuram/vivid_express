import mongoose from 'mongoose'

import Blog from '../models/blog.model.js'

export const get_blogs = async (req, res, next) => {
    try{

        const { categories, search, userId, page = 1, limit = 5 } =  req.query

        const pageNumber = parseInt(page, 10)
        const pageSize = parseInt(limit, 10)

        const filterData = {}

        if(categories && categories.length > 0){

            const convertedCatIds = categories.map(id => new mongoose.Types.ObjectId(id))
            
            filterData.categories = { $in: convertedCatIds }
        }

        if(search){
            filterData.title = { $regex: search, $options: 'i' }
            filterData.content = { $regex: search, $options: 'i' }
        }

        if(userId){
            filterData.author = userId
        }

        const blogs = await Blog.find(filterData).populate('author', 'name username profile').populate('categories').sort('-createdAt').skip((pageNumber -1) * pageSize).limit(pageSize)

        const totalBlogs = await Blog.countDocuments(filterData)

        return res.json({
            success: true,
            message: 'Blogs retrieved',
            data: blogs,
            hasNextPage: pageNumber * pageSize < totalBlogs
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const get_blog = async (req, res, next) => {
    try{

        const { blogId } = req.params

        if(!blogId){
            return res.status(400).json({
                success: false,
                message: 'Blog ID required'
            })
        }

        const blog = await Blog.findById(blogId).populate('author', 'name username profile').populate('categories')

        if(!blog){
            return res.status(400).json({
                success: false,
                message: 'Blog not found'
            })
        }

        return res.json({
            success: true,
            message: 'Blog retrieved',
            blog
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_blog = async (req, res, next) => {
    try{

        const { title, content, categories } = req.body

        if(!title || title.length < 10){
            return res.status(400).json({
                success: false,
                message: 'Title must be 10 characters'
            })
        }

        if(!content || content.length < 100){
            return res.status(400).json({
                success: false,
                message: 'Content must be 100 characters'
            })
        }

        if(!categories.length > 0){
            return res.status(400).json({
                success: false,
                message: 'Category required'
            }) 
        }

        const blog = new Blog({
            title,
            content,
            categories: categories,
            author: req.user
        })

        await blog.save()

        const createdBlog = await Blog.findById(blog._id).populate('author', 'name username profile')

        return res.json({
            success: true,
            message: 'blog create',
            blog: createdBlog
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrongg',
            error: err
        })
    }
}

export const update_blog = async (req, res, next) => {
    try{

        const { blogId } = req.params
        const { title, content } = req.body

        if(!title || !title.length >= 10){
            return res.status(400).json({
                success: false,
                message: 'Title must be 10 characters'
            })
        }

        if(!content || !content.length >= 100){
            return res.status(400).json({
                success: false,
                message: 'Content must be 100 characters'
            })
        }

        const blog = await Blog.findByIdAndUpdate(blogId, { title, content }, { new: true }).populate('author', 'name username profile')

        return res.json({
            success: false,
            message: 'Blog updated',
            blog
        })
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const delete_blog = async (req, res, next) => {
    try{

        const { blogId } = req.params

        await Blog.findByIdAndDelete(blogId)

        return res.json({
            success: false,
            message: 'Blog deleted',
            blogId
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const like = async (req, res, next) => {
    try{

        const { blogId } = req.params

        if(!blogId){
            return res.status(400).json({
                success: false,
                message: 'Blog ID required'
            })
        }

        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.status(400).json({
                success: false,
                message: 'Blog not found'
            })
        }

        if(blog.likes.includes(req.user)){
            blog.likes.pull(req.user)
            await blog.save()

            return res.json({
                success: true,
                message: 'Liked',
                liked: false
            })
        }else{
            blog.likes.push(req.user)
            await blog.save()

            return res.json({
                success: true,
                message: 'Liked',
                liked: true
            })
        }

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}