const express=require('express');
const route =express.Router()



const controller=require('../controller/controller');
const csvController=require('../controller/csvController')
const  login=require('../controller/login')
const user=require('../controller/User')


const multer=require('multer')
const fs=require('fs')
const path=require('path');
const { Error } = require('mongoose');

const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        
    
        if(!fs.existsSync('public')){
            fs.mkdirSync('public')
        }
        if(!fs.existsSync('public/csv')){
            fs.mkdirSync('public/csv')
        }
         cb(null,'public/csv')
    },
    filename:function(req,file,cb){
        
        cb(null,Date.now() + file.originalname)
    }
})

const upload=multer({
    storage:storage,
    fileFilter:function(req,file,cb){
    var ext =path.extname(file.originalname)
    if(ext !=='.csv'){
        return cb(new Error('Only csv files'))
    }
     cb(null,true)
    },
})


// api
route.post('/login',login.check)
route.post('/api/students',upload.single('csvFile'),csvController.create);
route.post('/students',controller.add);
route.get('/students',controller.find);
route.put('/api/students/:id',controller.update);
route.delete('/api/students/:id',controller.delete);

//user

route.post('/userAdd',user.addUser)
route.put('/user/:id',user.updateUser)
route.get('/getuser',user.getUser)

route.post('/user/search/:id',user.search)
route.delete('/userdelete/:id',user.deleteUser)

module.exports=route
