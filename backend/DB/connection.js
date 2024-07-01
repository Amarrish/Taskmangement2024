import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const connectionstring = process.env.DATABASE;

mongoose.connect(connectionstring).then(()=>{
    console.log('MongoDB connection successfull');
}).catch(err=>{
    console.log(err,'MongoDB is not connected');
})