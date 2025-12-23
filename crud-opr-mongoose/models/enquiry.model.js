let mongoose = require('mongoose');

let userEnquireSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
        required:true,
    },
    message:{
        type:String,
        required:true
    }
});

let enquireModel = mongoose.model("enquiry",userEnquireSchema)
// let enquireModel = mongoose.model("db-name",schemadatabase)
module.exports= enquireModel;

