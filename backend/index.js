import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import './DB/connection.js'
import routes from './Routes/Routes.js'

const app = express();
app.use(express.json());
app.use(cors());
app.use(routes)

const PORT = 5000;

app.listen(PORT, ()=>{
    console.log(`Server started at port ${PORT}`);
})

