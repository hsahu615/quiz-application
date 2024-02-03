// server/config/database.ts

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI: string = process.env.MONGODB_URL || '';

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error(`MongoDB connection error: ${error}`);
    process.exit(1); // Exit process with failure
  });

export default mongoose;
