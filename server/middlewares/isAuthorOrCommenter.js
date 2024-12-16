import Comment from '../models/comment.model.js'
import Blog from '../models/blog.model.js'

const isAuthorOrCommenter = async (req, res, next) => {
    try{

        const { commentId } = req.params

        if(!commentId){
            return res.status(400).json({
                success: false,
                message: 'Comment ID required'
            })
        }

        const comment = await Comment.findById(commentId)

        if(!comment){
            return res.status(400).json({
                success: false,
                message: 'Comment not found'
            })
        }

        const blog = await Blog.findById(comment.blog)

        if(!blog){
            return res.status(400).json({
                success: false,
                message: 'Blog not found'
            })
        }

        if(comment.author.toString() === req.user.toString() || blog.author.toString() === req.user.toString()){
            next()
        }else{
            return res.status(400).json({
                success: false,
                message: 'Unauthorized'
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

export default isAuthorOrCommenter