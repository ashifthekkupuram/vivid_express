import Blog from '../models/blog.model.js'
import User from '../models/user.model.js'

const isAuthor = async (req, res, next) => {
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

        if(blog.author.toString() === req.user.toString()){
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

export default isAuthor