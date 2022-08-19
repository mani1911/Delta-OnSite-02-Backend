import mongoose from "mongoose";

const detailSchema = new mongoose.Schema({
    name : {
        type : 'string',
        required : true
    },
    password : {
        type : 'String',
        required : true
    },
    userID : {
        type : 'String',
        required : true
    }
});

const Detail = new mongoose.model('Detail', detailSchema);

export default Detail;