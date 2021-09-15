import express from 'express'
import {createCategory, getAllCategories} from '../controllers/categoriesController.js';
import { verifyToken, isAdmin } from "../utils/middleware.js";

const router = express.Router()

router.route('/').post(verifyToken, isAdmin, createCategory).get(verifyToken, isAdmin, getAllCategories)

export default router