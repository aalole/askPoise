import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import { promisify } from 'util'

const verifyToken = async (req, res, next) => {
    let token;
    try {
        const reqHeaders = req.headers.authorization
        if (reqHeaders && reqHeaders.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
            const verifiedToken = jwt.verify(token, process.env.JWT_SECRET)
            const currentUser = await User.findById(verifiedToken.id)
            if (!currentUser) {
                throw new Error('User does not exist')
            }
            req.user = currentUser;
            res.locals.user = currentUser;
            next()
        } else {
            throw new Error('Invalid token. Please login again')
        }
    } catch (error) {
        console.log('Error:', error)
    }
}

const isAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.isAdmin) {
        return next()
    } else {
        res.status(403)
        throw new Error('Permission denied! You cannot perform this operation')
    }
}

export { verifyToken, isAdmin }