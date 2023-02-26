var studentDB=require('../model/model')

// create and save new user
exports.add=(req,res)=>{
if(!req.body){
    res.status(400).send({message:"content can not be empty"});
    return;
}
const student=new studentDB({
    name:req.body.name,
    CourseName:req.body.CourseName,
    Project:req.body.Project,
    Batch:req.body.Batch,
    CourseStatus:req.body.CourseStatus,
    placementStatus:req.body.placementStatus
})
student
   .save(student)
   .then(data=>{
        res.send(data)
   })
   .catch(err=>{
    res.status(500).send({
        message:err.message||"some error occured"
    })
   })


}

// retrieve and return users
exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        studentDB.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"Not found user with id"+id})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"error retrieving user"})
        })
    }else{
   studentDB.find()
   .then(student=>{
    res.send(student)
   })
   .catch(err=>{
    res.status(500).send({message:err.message||"error occured"})
   })
}
}

// update

exports.update=(req,res)=>{
      if(!req.body){
        return res
        .status(400)
        .send({message:"data to update cannot be empty"})
      }
      const id=req.params.id;
     studentDB.findByIdAndUpdate(id,req.body)
     .then(data=>{
        if(!data){
            res.status(404).send({message:`cannot specify with $(id).user not found` })
        }else{
            res.send(data)
        }

     })
     .catch(err=>{
        res.status(500).send({message:"error update user information"})
     })
}

// delete
exports.delete=(req,res)=>{
   const id=req.params.id;
   studentDB.findByIdAndDelete(id)
   .then(data=>{
    if(!data){
        res.status(404).send({message:`cannot delete with $(id).user not found` })
    }else{
        res.send({
            message:"user deleted"
        })
    }
   })
   .catch(err=>{
    res.status(500).send({message:"error could not delete"})
 })

}
