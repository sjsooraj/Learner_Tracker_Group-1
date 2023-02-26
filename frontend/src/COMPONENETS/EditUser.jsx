import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
   

   
  let navigate =useNavigate(); //The useHistory hook gives you access to the history instance that you may use to navigate.
  const { id } = useParams();  //The useParams() hook helps us to access the URL parameters from a current route. 
  
 
  const [user ,setUser] = useState({
      username:"",
      usertype:"",
      email:"",
      password:""
      
  })
 
 
  const { username, usertype, email, password } = user;
 
  const onInputChange = e => {
    setUser({ ...user,[e.target.name]: e.target.value });
  };
 
  useEffect(() => {
    loadUser();
  }, []);
 
   
  const updateEmployee = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/user/${id}`, user);
    navigate("/user");
  };
 
  const loadUser =  () => {
    fetch(`http://localhost:3001/user/search/${id}`,{
            method: "GET",
          })
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
        setUser({
                    id: id,
                    update: true,
          username: result.username,
          usertype: result.usertype,
          email: result.email,
          password: result.password
          
 
                });
            })
            .catch((error) => console.log("error", error));
  };
 

   
 
  
return (
    <div className="container">
    <div className="row mt-4"> 
     <div className="col-sm-5 col-offset-3 mx-auto shadow p-5">
       <h4 className="text-center mb-4">Edit a user</h4>
      
        
         <div className="form-group mb-3">
           <input
             type="text"
             className="form-control form-control-lg"
             placeholder="Enter  Name"
             name="username"
             value={username}
             onChange={e => onInputChange(e)}
           />
         </div>
         <div className="form-group mb-3">
           <input
             type="text"
             className="form-control form-control-lg"
             placeholder="enter usertype"
             name="usertype"
             value={usertype}
             onChange={e => onInputChange(e)}
           />
         </div>
         <div className="form-group mb-3">
           <input
             type="text"
             className="form-control form-control-lg"
             placeholder="Enter email"
             name="email"
             value={email}
             onChange={e => onInputChange(e)}
           />
         </div>
         <div className="form-group mb-3">
           <input
             type="text"
             className="form-control form-control-lg"
             placeholder="Enter Password"
             name="password"
             value={password}
             onChange={e => onInputChange(e)}
           />
         </div>
         
         <button onClick={updateEmployee} className="btn btn-secondary btn-block">Update User </button>
      
      </div>
     </div> 
   </div>
)

}

export default EditUser