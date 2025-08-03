import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const DBConnection = async () => {
    const MONGODB_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_CLUSTER}/`;
    
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Initial database connection error:", error.message);
        process.exit(1); 
    }

    mongoose.connection.on('disconnected', () => {
        console.warn("Database disconnected");
    });

    mongoose.connection.on('error', (error) => {
        console.error("Database connection error:", error.message);
    });
}

export default DBConnection;