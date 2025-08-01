import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDb connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDb:', error);
        process.exit(1);
    }
}

export default connectDB;