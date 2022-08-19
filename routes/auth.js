import Express from "express";
import bcrypt from 'bcrypt';
const userRoute = Express.Router();
import User from '../models/user.js';

userRoute.post('/reg', async (req,res)=>{
    try{
        const { name, username, password } = req.body;
        const existing = await User.find({username});
        let message = '';
        let status = 0;
        if(existing.length > 0){
            message = 'User Already Exists';
        }
        else if(!username || !password){
            message = 'Input Field cannot be Empty';
        }
        else{
            const hash = await bcrypt.hash(password,12);
            const newUser = new User({username,password : hash,name});
            await newUser.save();
            message = 'User Registered';
            status = 1;
        }
        res.json({status, message});
    }
    catch(error){
        console.log(error.message);
    }
});

userRoute.post('/login', async (req,res)=>{
    const { username , password } = req.body;
    try{
        if(!username || !password){
            res.json({status : 0, message : 'No Input Field can be Empty'});
            return;
        }
        let message = 'Incorrect Username or Password';
        let status = 0;
        if(!username || !password){
            message = 'No Input Field can be Empty';
        }
        const user = await User.findOne({username});
        if(user){
            const isValidUser = await bcrypt.compare(password, user.password);
            if(isValidUser){
                message = 'Logged in Successfully';
                status = 1;
            }
        }
        res.json({status,message,user})
    }
    catch(e){
        console.log(e.message)
    }

});

export default userRoute;