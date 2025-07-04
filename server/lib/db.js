import mongoose from "mongoose";

// function to connect to mongodb databse
export const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => console.log('DATABASE CONNECTED...'))
        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`)
    } catch (error) {
        console.log(error);
    }
}