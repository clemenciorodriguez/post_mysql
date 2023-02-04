const mongoose = require("mongoose")


const StorageScheme =  new moongose.Schema(

    { 
        name: {
        type:String
    }
},


{
    email: {
        type:String,
        unique:true
    }


},


{ 
    
    password: {

        type:String


    }
},


{
    lat: {
        type:Number
        
    }


},


{
    lon: {
        type:Number
        
    }
    


},


{
    photos: {
        type:File
        
    }
    


},


{
    role: {
        type:["user", "admin"],
        default:"user",
        },
},

{

    timestamps:true,
    versionKey:false
}
);


module.exports = mongoose.module("storage", StorageScheme)
