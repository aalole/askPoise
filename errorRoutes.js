import express from 'express'
import { err404, err500 } from "../controllers/errorHandler";
const router = express.Router()

router.use(err404, err500);

export default router;