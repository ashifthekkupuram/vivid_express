import bcrypt from 'bcryptjs'

import User from '../models/user.model.js'

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d\S]{8,}$/

export const change_name = async (req, res, next) => {
    try {

        const { firstName, secondName } = req.body

        if (!firstName || !secondName) {
            return res.status(400).json({
                success: false,
                message: 'First Name and Second Name required',
            })
        }

        const user = await User.findById(req.user)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        const updatedUser = await User.findByIdAndUpdate(req.user, { name: { firstName: firstName.toLowerCase(), secondName: secondName.toLowerCase() } }, { new: true })

        return res.json({
            success: true,
            message: 'Name changed',
            UserData: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                profile: updatedUser.profile
            }
        })

    } catch (err) {
        
        console.log(err)

        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const change_username = async (req, res, next) => {
    try {

        const { username } = req.body

        if (!username) {
            return res.status(400).json({
                success: false,
                message: 'Username required',
            })
        }

        const [user, usernameExist] = await Promise.all([
            User.findById(req.user),
            User.findOne({ username: username.toLowerCase() })
        ])

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        if (usernameExist) {
            return res.status(400).json({
                success: false,
                message: 'Username is already taken',
            })
        }

        const updatedUser = await User.findByIdAndUpdate(req.user, { username: username.toLowerCase() }, { new: true })

        return res.json({
            success: true,
            message: 'Username changed',
            UserData: {
                _id: updatedUser._id,
                email: updatedUser.email,
                username: updatedUser.username,
                name: updatedUser.name,
                profile: updatedUser.profile
            }
        })

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}

export const change_password = async (req, res, next) => {
    try {

        const { oldPassword, newPassword } = req.body

        if(!oldPassword || !newPassword){
            return res.status(400).json({
                success: false,
                message: 'Old Password and New Password required',
            })
        }

        const user = await User.findById(req.user)

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'User not found',
            })
        }

        const match = bcrypt.compareSync(oldPassword, user.password)

        if (!match) {
            return res.status(400).json({
                success: false,
                message: 'Incorrect old password'
            })
        } else {

            if (!newPassword.match(PASSWORD_REGEX)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid Password'
                })
            }

            bcrypt.hash(newPassword, 12, async (err, hashedPassword) => {
                if (!err) {

                    const updatedUser = await User.findByIdAndUpdate(req.user, { password: newPassword }, { new: true })

                    return res.json({
                        success: true,
                        message: 'Password changed',
                    })

                } else {
                    return res.status(400).json({
                        success: false,
                        message: 'Something went wrong',
                        error: err
                    })
                }
            })

        }

    } catch (err) {
        return res.status(400).json({
            success: false,
            message: 'Something went wrong',
            error: err
        })
    }
}