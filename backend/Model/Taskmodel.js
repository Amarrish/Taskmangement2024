import mongoose from "mongoose";

const taskschema = new mongoose.Schema({
    taskname:{
        type:String,
        required:true
    },
    taskdate:{
        type:String,
        required:true
    },
    taskinfo:{
        type:String,
        required:true
    },
    taskprogress:{
        type:Number,
        required:true
    },
    userId:{
        type:String,
        required:true,
    },

});

export const task = mongoose.model('task', taskschema)
