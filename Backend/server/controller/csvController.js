
const fs=require('fs')
const path=require('path')
const csv=require('fast-csv')
 var studentDB=require('../model/model')


exports.create=async(req,res)=>{
  console.log(req.file)
  const allRecords=[]
  
  try{
   fs.createReadStream(path.join(__dirname, '../../', '/public/csv/' + req.file.filename))
    .pipe(csv.parse({headers:true}))
   .on('error',err=>console.log(err))
   .on('data',row=>{allRecords.push(row)})
   .on('end',async rowCount=>{
      console.log(`${rowCount}rows has parsed`)
      
      try{
        const students=await studentDB.insertMany(allRecords)
     
        res.json({
          message:'created succesfully',
          students
        })
      }catch(err){
       return res.status(400).json(err)
      } 
        
    })
  }catch(error){
    res.status(400).json(error)
  }

}
