import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : 'string',
        required : true
    },
    name : {
        type : 'string',
        required : true
    },
    password : {
        type : 'String',
        required : true
    },
});

const User = new mongoose.model('User', userSchema);

export default User;