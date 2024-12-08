import express from 'express';
import dotenv from 'dotenv';
import connectDB from './DB/conn.js';
import router from './routes/api.js';
import { setLanguage } from './middlewares/languageMiddleware.js';

const app = express();
app.use(express.json());
app.use(setLanguage)
dotenv.config();


app.get("/",(req,res)=>{
    res.send("hello world");
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on port http://localhost:${process.env.PORT}`);
},);

connectDB();
app.use('/api/v1',router);


