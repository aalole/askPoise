import express from 'express'
import { createUser, login, updateUserToAdmin, getAllUsers, getUser } from '../controllers/userController.js'
import { isAdmin, verifyToken } from '../utils/middleware.js'

const router = express.Router()

router.route('/').post(createUser).get(verifyToken, isAdmin, getAllUsers)
router.route('/login').post(login)
router.route('/:id').patch(verifyToken, isAdmin, updateUserToAdmin).get(verifyToken, isAdmin, getUser)



export default router;