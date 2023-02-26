import 'bootstrap/dist/css/bootstrap.min.css'
import React, { useState, useEffect} from "react";
import axios from "axios";
import { Link} from 'react-router-dom';
import Navbar2 from './Navbar2';
const User = () => {
    const [search,setSearch] =useState('');
    const [record,setRecord] = useState([]);
   
    const [user, setUser] = useState({
        username: "",
        usertype: "",
      email: "",
      password: ""
      
    });
    
      //  Object Destructuring 
      const { username, usertype, email,password} = user;
      const onInputChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
      };
       
      // On Page load display all records 
      const loadEmployeeDetail = async () =>  
      {
        var response = fetch('http://localhost:3001/getuser')
           .then(function(response){
              return response.json();
            })
           .then(function(myJson) {
              setRecord(myJson);
            });
      }
      useEffect(() => {
        loadEmployeeDetail();
      }, []);
   
      // Insert Employee Records 
      const submitEmployeeRecord = async (e) => {
          e.preventDefault();
          e.target.reset();
          await axios.post("http://localhost:3001/userAdd",user);
          alert('Data Inserted');
           
          loadEmployeeDetail();
      };
       
      // Search Records here 
    
       
      // Delete Employee Record
      const deleteRecord = (id) =>
      {
        axios.delete(`http://localhost:3001/userdelete/${id}`)
        .then((result)=>{
          loadEmployeeDetail();
        })
        .catch(()=>{
          alert('Error in the Code');
        });
      };
  return (
    <section>  
     <div>
      <Navbar2/>
      </div> 
  
   <div class="container">  
   <h4 className="mb-3 text-center mt-4">WELCOME</h4>
     <div class="row mt-3">
      <div class="col-sm-4">
         <div className="box p-3 mb-3 mt-5" style={{border:"1px solid #d0d0d0"}}>
           <form onSubmit={submitEmployeeRecord}> 
           <h5 className="mb-3 ">Insert Users</h5>
               <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="username"   value={username} onChange={e => onInputChange(e)} placeholder="Enter name" required=""/>
               </div>
                 
               <div class="form-group">
                  <input type="text" class="form-control  mb-4" name="usertype" value={usertype} onChange={e => onInputChange(e)}  placeholder="Enter usertype" required=""/>
               </div>
    
               <div class="form-group">
                  <input type="text" class="form-control mb-4" name="email" value={email} onChange={e => onInputChange(e)}  placeholder="Enter Email" required=""/>
               </div>
              
               <div class="form-group">
                  <input type="text" class="form-control mb-4" name="password" value={password} onChange={e => onInputChange(e)}  placeholder="Enter Password" required=""/>
               </div>

               
               <button type="submit" class="btn btn-primary btn-block mt-4">Insert Record</button>
            </form>
       </div>
     </div>
     <div class="col-sm-8">
       <h5 class="text-center  ml-4 mt-4  mb-5">View Records</h5>
      
       <table class="table table-hover  table-striped table-bordered ml-4 ">
           <thead>
           <tr>
               <th>Name</th>
               <th>usertype</th>
               <th>Email</th>
               <th>password</th>
               <th>Action</th>
               
           </tr>
           </thead>
           <tbody>
    
           {record.map((name)=>
               <tr>
               <td>{name.username}</td>
               <td>{name.usertype}</td>
               <td>{name.email}</td>
               <td>{name.password}</td>
               
               <td>
                     <a  className="text-danger mr-2" 
                       onClick={() => {
                         const confirmBox = window.confirm(
                           "Do you really want to delete "+ name.username
                         )
                         if (confirmBox === true) {
                           deleteRecord(name._id)
                         }
                       }}>
                         <i class="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                  
                   <Link class=" mr-2" to={`/edituser/${name._id}`}>
                      <i class="fa fa-edit" aria-hidden="true"></i> 
                   </Link>
               </td>
               </tr>
               )} 
           </tbody>
       </table>
     </div>
     </div>
   </div>
  </section>
  )
}

export default User