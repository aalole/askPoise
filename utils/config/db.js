import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MONGODB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log('Error', error)
        process.exit(1)
    }
}

export default connectDb