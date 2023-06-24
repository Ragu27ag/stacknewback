import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import userRouter from './routes/user.js'
import questionRouter from './routes/question.js'
import answerRouter from './routes/answer.js'
import dotenv from 'dotenv';




const PORT = 5000;

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors())

app.use('/user',userRouter);
app.use('/questions',questionRouter);
app.use('/answer',answerRouter);

app.get('/' , (req,res) =>{
    res.send('stack api');
})


const DB_URL = process.env.CONNECTION_URL

mongoose.connect(DB_URL,{useNewUrlParser : true,useUnifiedTopology: true})
.then(() => app.listen(PORT,() => {console.log(`running on port ${PORT}`)}))
.catch((err) => console.log(err.message))