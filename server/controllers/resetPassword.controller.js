import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

import resetPassword from '../models/resetPassword.model.js'
import User from '../models/user.model.js'

import transporter from '../utils/mail.js'

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

dotenv.config()

export const get_reset_password = async (req, res, next) => {
    try{

        const { token } = req.params

        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        const resetToken = await resetPassword.findOne({ token })

        if(!resetToken){
            return res.status(400).json({
                success: false,
                message: 'Invalid Token'
            })
        }

        if(resetToken.expired){
            return res.status(400).json({
                success: false,
                message: 'Token is expired'
            })
        }

        return res.json({
            success: true,
            message: 'Valid Token'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const post_reset_password = async (req, res, next) => {
    try{

        const { email } = req.body

        if(!email){
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found'
            })
        }

        await resetPassword.updateMany({ user: user._id }, { expired: true })

        const resetToken = new resetPassword({ user: user._id })

        const URL = process.env.ALLOWED_ORIGINS.split(' ')
        
        Promise.all([
            await resetToken.save(),
            await transporter.sendMail({
                from: process.env.EMAIL,
                to: email.toLowerCase(),
                subject: 'Vivid Express - Reset Password',
                text: 'reset password',
                html: `<a href="${URL}/confirm-reset-password/${resetToken.token}">Click Me</a>`
            })
        ])

        return res.json({
            success: true,
            message: 'Check your email to reset password'
        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const put_reset_password = async (req, res, next) => {
    try{

        const { token } = req.params
        const { newPassword } = req.body
        
        if(!token){
            return res.status(400).json({
                success: false,
                message: 'Token is required'
            })
        }

        if(!newPassword){
            return res.status(400).json({
                success: false,
                message: 'New password is required'
            })
        }

        const resetToken = await resetPassword.findOne({ token })

        if(!resetToken){
            return res.status(400).json({
                success: false,
                message: 'Invalid Token'
            })
        }

        if(resetToken.expired){
            return res.status(400).json({
                success: false,
                message: 'Token is expired'
            })
        }else{

            const user = await User.findById(resetToken.user)

            if(!user){
                return res.status(400).json({
                    success: false,
                    message: 'User not found'
                })
            }

            if(!newPassword.match(PASSWORD_REGEX)){
                return res.status(400).json({
                    success: false,
                    message: 'Invalid password'
                })
            }

            bcrypt.hash(newPassword, 12, async (err, hashedPassword) => {
                if(err){
                    return res.status(400).json({
                        success: false,
                        message: 'Something went wrong',
                        error: err
                    })
                }


                await Promise.all([
                    await User.findByIdAndUpdate(resetToken.user, { password: hashedPassword }),
                    await resetPassword.updateMany({ user: resetToken.user }, { expired: true })
                ])

                return res.json({
                    success: true,
                    message: 'Password reset Successful'
                })
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