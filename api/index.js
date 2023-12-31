import express, { response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() =>
{
    console.log('Connected to MongoDB');
}).catch((err) =>
{
    console.log(err);
});

const app = express();

app.use(express.json());

app.listen(3000, () =>
{ 
    console.log('Server listning on port 3000')
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next) =>
{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
})