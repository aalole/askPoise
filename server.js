import express from "express";
import dotenv from "dotenv"
import connectDb from './utils/config/db.js'
import morgan from "morgan";

import userRoutes from './routes/userRoutes.js'

const app = express()

dotenv.config()

connectDb()

const port = process.env.PORT || 5900

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/api/v1/users', userRoutes)

app.listen(port, () => {
    console.log(`app listening on port ${port} in ${process.env.NODE_ENV} mode`);
})
