
const bcrypt = require('bcrypt')


var User =require('../model/user')
//View All Users

exports.addUser=(req, res) => {
    
    const Data = new User({
      
      username: req.body.username,
      usertype: req.body.usertype,
      email: req.body.email,
      
      password:bcrypt.hashSync(req.body.password,10)
    });
    let result = User.find({ email: Data.email }, (err, data) => {
      if (data.length > 0) {
        res.json({ status: "Failed", data: "Invalid email" });
      } else {
        res.json({ status: "success", data: data });
        Data.save();
      }
    });
  };
  
  exports.updateUser= (req, res) => {
    var id = req.params.id;
    var data = {
      username: req.body.username,
      usertype: req.body.usertype,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
    };
    User.findByIdAndUpdate(id, data, (err, data) => {
      if (err) {
        res.json({ status: "Error", Error: err });
      } else {
        res.json({ status: "success", data: data });
      }
    });
  };
  
  exports.deleteUser=(req, res) => {
    var id = req.params.id;
    User.findByIdAndDelete(id, (err, data) => {
      if (err) {
        res.json({ status: "Error", Error: err });
      } else {
        res.json({ status: "success", data: data });
      }
    });
  }
  
  exports.search= (req, res) => {
       //console.log('get emp by id');
       const id=req.params.id;
       User.findById(id)
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
}
  exports.getUser=async(req,res)=>{
    try {
      var data = await User.find()
      res.send(data)
    } catch (error) {
      res.status(500).send(error)
    }
  }