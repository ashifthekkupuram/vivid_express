import Comment from '../models/comment.model.js'
import Blog from '../models/blog.model.js'

export const get_comments = async (req, res, next) => {
    try{

        const { blogId } = req.params
        const { page = 1, limit = 10 } = req.query

        const pageNumber = parseInt(page, 10)
        const pageSize = parseInt(limit, 10)

        if(!blogId){
            return res.status(400).json({
                success: false,
                message: 'Blog ID required',
            })
        }

        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.status(400).json({
                success: false,
                message: 'Blog not found',
            })
        }

        const comments = await Comment.find({ blog }).populate('author', 'username name profile').populate('blog').skip((pageNumber - 1) * pageSize).limit(pageSize)

        const totalComments = await Comment.countDocuments({ blog })

        return res.json({
            success: true,
            message: 'Comment retrieved',
            data: comments,
            hasNextPage: pageNumber * pageSize < totalComments
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const create_comment = async (req, res, next) => {
    try{

        const { blogId } = req.params
        const { content } = req.body

        if(!blogId){
            return res.status(400).json({
                success: false,
                message: 'Blog ID required',
            })
        }

        if(!content || content.length < 10 ){
            return res.status(400).json({
                success: false,
                message: 'Comment must be 10 characters or above',
            })
        }

        const blog = await Blog.findById(blogId)

        if(!blog){
            return res.status(400).json({
                success: false,
                message: 'Blog not found',
            })
        }

        const comment = new Comment({
            content,
            blog,
            author: req.user
        })

        await comment.save()

        const createdComment = await Comment.findById(comment._id).populate('author', 'username name profile')

        return res.json({
            success: true,
            message: 'Comment created',
            comment: createdComment
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const update_comment = async (req, res, next) => {
    try{

        const { commentId } = req.params
        const { content } = req.body

        if(!content || !content.length >= 10 ){
            return res.status(400).json({
                success: false,
                message: 'Content characters must be 10 or above',
            })
        }

        const updatedComment = await Comment.findByIdAndUpdate(commentId, { content }, { new: true }).populate('author', 'username name profile')

        return res.json({
            success: true,
            message: 'Comment edited',
            comment: updatedComment
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const delete_comment =  async (req, res, next) => {
    try{

        const { commentId } = req.params
        
        await Comment.findByIdAndDelete(commentId)

        return res.json({
            success: true,
            message: 'Comment deleted',
            commentId
        })

    } catch {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}