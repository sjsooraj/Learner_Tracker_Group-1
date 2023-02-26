const mongoose =require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
   
    usertype:{
        type:String,
    },
    email:{ 
        type: String,
        

    },
    password:{
        type:String,
        required:true
    }
});

const userDB=mongoose.model('Userdatas',UserSchema);
module.exports=userDB;