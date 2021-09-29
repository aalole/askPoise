import express from 'express'
import { verifyToken, isAdmin } from "../utils/middleware.js";
import { addImage, getAllImages } from '../controllers/fileUploadControllers.js';
import { imageUpload } from '../config/multerConfig.js';

const router = express.Router()

// router.use(err404, err500)
router.post('/images', verifyToken, isAdmin, imageUpload.any(), addImage.createImage)

router.route('/').get(verifyToken, isAdmin, getAllImages)

export default router