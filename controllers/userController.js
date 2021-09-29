import User from "../models/userModel.js";
import createToken from '../utils/generateToken.js'

const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, phone, password, passwordConfirm, isAdmin } = req.body;
        const userExist = await User.findOne({ email })
        if (userExist) {
            throw new Error('User already exists')
        } else {
            const user = await User.create({
                firstname,
                lastname,
                email,
                phone,
                password,
                isAdmin,
                passwordConfirm
            })
            if (user) {
                res.status(201).json({
                    data: {
                        message: 'user created successfully',
                        _id: user._id,
                        firstname: user.firstname,
                        lastname: user.lastname,
                        email: user.email,
                        image: user.image,
                        phone: user.phone,
                        isAdmin: user.isAdmin,
                        token: createToken(user._id)
                    }
                })
            }
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email })
        const passwordMatch = await user.comparePassword(password)
        if (user && passwordMatch) {
            res.status(200).json({
                data: {
                    message: 'Login successful',
                    _id: user._id,
                    firstname: user.firstname,
                    lastname: user.lastname,
                    email: user.email,
                    image: user.image,
                    phone: user.phone,
                    isAdmin: user.isAdmin,
                    token: createToken(user._id)
                }
            })
        }

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const updateUserToAdmin = async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).select('-password')
        if (!updatedUser) {
            res.status(404)
            throw new Error('user not found')
        }
        res.status(200).json({
            data: {
                message: 'User updated successfully',
                user: updatedUser
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json({
            data: {
                total: users.length,
                users
            }
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            res.status(404)
            throw new Error('user not found')
        }
        res.status(200).json({
            data: user
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export { createUser, login, updateUserToAdmin, getAllUsers, getUser }