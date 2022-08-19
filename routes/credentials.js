import Express from "express";
const detailRoute = Express.Router();
import Detail from '../models/detail.js';

detailRoute.get('/:id', async (req,res)=>{
    try{
        const id = req.params.id;

        const creds = await Detail.find({userID : id});
        
        res.json({detail : creds});
    }
    catch(e){
        console.log(e.message)
    }

})

detailRoute.post('/new', async (req,res)=>{
    try{
        const {userID , password, name} = req.body;
        const newDetail = new Detail({name, userID, password});
        await newDetail.save();
        res.json({message : 'Credentials Added'});
    }
    catch(e){
        console.log(e.message);
    }

})

detailRoute.delete('/delete/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        await Detail.findOneAndDelete({_id : id});
        res.json({message : 'Credentials Deleted'});
    }
    catch(e){
        console.log(e.message);
    }

})

detailRoute.patch('/edit/:id', async (req,res)=>{
    try{
        const id = req.params.id;
        const {name,password} = req.body;
        if(!password || !name){
            return;
        }
        else{
            const user = await Detail.findOneAndUpdate({_id :id}, {name, password});
        }
        res.json({message : 'Changes Successfully Updated'});
    }
    catch(e){
        console.log(e.message);
    }
})


export default detailRoute;