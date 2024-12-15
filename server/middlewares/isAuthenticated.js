import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

import User from '../models/user.model.js'

dotenv.config()

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY

const isAuthenticated = async (req, res, next) => {
    try{

        if(req.headers.authorization === undefined || req.headers.authorization === null){
            return res.status(400).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const token = req.headers.authorization.split(' ')[1]

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is not found'
            })
        }

        jwt.verify(token, ACCESS_SECRET_KEY, async (err, decoded) => {
            if(err){
                if(err.name === 'TokenExpiredError'){
                    return res.status(403).json({
                        success: false,
                        message: 'Token Expired'
                    })
                }

                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
                })
            }

            if(decoded){

                const user = await User.findById(decoded._id)

                if(!user){
                    return res.status(400).json({
                        success: false,
                        message: 'User not found'
                    })
                }

                req.user = decoded._id

                next()

            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Token expired or invalid'
                })
            }

        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    } 
}

export default isAuthenticated