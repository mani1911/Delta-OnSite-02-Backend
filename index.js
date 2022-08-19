
import Express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/auth.js";
import detailRoute from "./routes/credentials.js";
import cors from 'cors';
import dotenv from "dotenv";
dotenv.config();

const app = Express();
const Port = process.env.PORT || 3002;
const mongoPass = process.env.MONGO_PASS;
const URL = `mongodb+srv://mani1911:${mongoPass}@cluster0.5am1io6.mongodb.net/?retryWrites=true&w=majority`;

app.use(cors());
app.use(Express.json());
app.use('/user', userRoute);
app.use('/detail', detailRoute);

mongoose.connect(URL, {useNewUrlParser : true, useUnifiedTopology : true})
.then(()=>{
    app.listen(Port, ()=>{
        console.log(`Connection Established : ${Port}`);
    })
})
.catch(e=>{
    console.log(e.message);
});

app.get('/health', (req,res)=>{
    res.send('Healthy');
})