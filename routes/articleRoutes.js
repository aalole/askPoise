import express from 'express'
import { createPost } from '../controllers/articleController.js';
import { verifyToken, isAdmin } from "../utils/middleware.js";

const router = express.Router()

router.route('/').post(verifyToken, isAdmin, createPost)

export default router