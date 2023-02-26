const mongoose=require('mongoose');

var schema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    CourseName:{
        type:String,
        require:true
    },
    Project:{
        type:String,
        require:true
    },
    Batch:{
        type:String,
        require:true
    },
    CourseStatus:{
        type:String,
        require:true
    },
    placementStatus:{
        type:String,
        require:true
    },
   

},
{
    timestamps: true,
}
);

const studentDB=mongoose.model('studentDB',schema);
module.exports=studentDB;


