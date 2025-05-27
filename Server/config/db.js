import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.dbConnection || 'mongodb://localhost:27017/mydb');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
};

export default connectDB;
