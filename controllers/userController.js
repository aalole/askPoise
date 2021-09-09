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
        console.log('Error', error)
    }

}

export { createUser }