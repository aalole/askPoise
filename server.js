import express from "express";
import dotenv from "dotenv"
import connectDb from './config/db.js'
import morgan from "morgan";
import cors from 'cors'
// import fileUpload from "express-fileupload";

import userRoutes from './routes/userRoutes.js'
import articleRoutes from './routes/articleRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js'

const app = express()

dotenv.config()

connectDb()

const port = process.env.PORT || 5900

app.use(express.json())
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}
// app.use(fileUpload({ useTempFiles: true }))
// const baseUrl =  'http://localhost:3000' || "https://deploy-preview-2--askpoise-preview.netlify.app" 

const corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
}
app.use('/api/v1/users', cors(corsOptions), userRoutes)
app.use('/api/v1/posts', cors(corsOptions), articleRoutes)
app.use('/api/v1/category', cors(corsOptions), categoryRoutes)

app.listen(port, () => {
    console.log(`app listening on port ${port} in ${process.env.NODE_ENV} mode`);
})
