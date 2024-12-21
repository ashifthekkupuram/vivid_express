import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'
import { json } from 'express'

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

const ACCESS_SECRET_KEY = process.env.ACCESS_SECRET_KEY
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY

export const login = async (req, res, next) => {
    try{

        const { email, password } =  req.body

        if(!email, !password){
            return res.status(400).json({
                success: false,
                message: 'Email and Password required'
            })
        }

        const user = await User.findOne({ email: email.toLowerCase() })

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials'
            })
        }

        const match = bcrypt.compareSync(password, user.password)

        if(!match){
            return res.status(400).json({
                success: false,
                message: 'Invalid user credentials'
            })
        }else{

            const access_token = jwt.sign({_id: user._id}, ACCESS_SECRET_KEY, { expiresIn: '5m' })
            const refresh_token = jwt.sign({_id: user._id}, REFRESH_SECRET_KEY, { expiresIn: '1d' })

            res.cookie('jwt', refresh_token, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 1 * 24 * 60 * 60 * 1000
            })

            return res.json({
                success: true,
                message: 'Login successfully',
                access_token,
                UserData: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    profile: user.profile
                }
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

export const register = async (req, res, next) => {
    try{

        const { email, firstName, secondName, password } = req.body

        if(!email, !firstName, !secondName, !password){
            return res.status(400).json({
                success: false,
                message: 'Email, Name, Password required'
            })
        }

        const emailExist = await User.findOne({ email: email.toLowerCase() })

        if(emailExist){
            return res.status(400).json({
                success: false,
                message: 'User with the email already exist'
            })
        }

        if(!email.match(EMAIL_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'Invalid email'
            })
        }

        if(!password.match(PASSWORD_REGEX)){
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            })
        }

        bcrypt.hash(password, 12, async (err, hashedPassword) => {
            if(!err){

                const user = new User({
                    email: email.toLowerCase(),
                    name: {
                        firstName: firstName.toLowerCase(),
                        secondName: secondName.toLowerCase(),
                    },
                    password: hashedPassword
                })

                await user.save()

                return res.json({
                    success: true,
                    message: 'User created'
                })

            }else{
                return res.status(400).json({
                    success: false,
                    message: 'Something went wrong',
                    error: err
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

export const refresh = async (req, res, next) => {
    try{
        
        const cookies =  req.cookies

        if(!cookies?.jwt){
            return json.status(401).json({
                success: false,
                message: 'Unauthorized'
            })
        }

        const refresh_token = cookies.jwt

        jwt.verify(refresh_token, REFRESH_SECRET_KEY, async (err, decoded) => {
            if(err){
                return res.status(403).json({
                    success: false,
                    message: 'Session Expired',
                })
            }

            const user = await User.findById(decoded._id)

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: 'Unauthorized'
                })
            }

            const access_token = jwt.sign({_id: user._id}, ACCESS_SECRET_KEY, { expiresIn: '5m' })

            return res.json({
                success: true,
                message: 'Refresh successfully',
                access_token,
                UserData: {
                    _id: user._id,
                    email: user.email,
                    username: user.username,
                    name: user.name,
                    profile: user.profile
                }
            })

        })

    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const logout = async (req, res, next) => {
    try{
        const cookies = req.cookies

        if (!cookies?.jwt) return res.sendStatus(204)

        res.clearCookie('jwt', { httpOnly: true, secure: true, sameSite: 'None' })

        res.json({ success: true, message: 'Logged out' })
    } catch(err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}