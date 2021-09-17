import express from 'express'
import { createPost, getPosts, getSinglePost, updatePost, deletePost, createArticleReview, getTopArticles } from '../controllers/articleController.js';
import { verifyToken, isAdmin } from "../utils/middleware.js";

const router = express.Router()

router.route('/').post(verifyToken, isAdmin, createPost).get(getPosts)
router.post('/:id/review', verifyToken, createArticleReview)
router.get('/top-articles', getTopArticles)
router.route('/:id')
    .get(verifyToken, getSinglePost)
    .patch(verifyToken, isAdmin, updatePost)
    .delete(verifyToken, isAdmin, deletePost)

export default router