import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

import { Link } from 'react-router-dom';
import Navbar2 from './Navbar2';

const Trainer = () => {
  const [data, setData] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent =()=>{
    axios.get('http://localhost:3001/students')
    .then(response => setData(response.data))
    .catch(error => console.error(error));
  }
 
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('csv', selectedFile);
    try {
      const response = await axios.post('http://localhost:3001/api/students', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const deleteRecord = (id) =>
  {
    axios.delete(`http://localhost:3001/api/students/${id}`)
    .then((result)=>{
      loadStudent();
    })
    .catch(()=>{
      alert('Error in the Code');
    });
  };
  return (
    <>
      <div>
        <Navbar2/>
      </div>
      <div className="container mt-4">
        <div>
          <Link to="/add" className="btn btn-success">Add</Link>
          <div>
            <input type={"file"} id={"csvFile"} name="csv" accept={".csv"} onChange={handleFileChange} />
            <button className="btn btn-success"  onClick={handleSubmit}> IMPORT  </button>
          </div>
        </div>

        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Course Name</th>
              <th>Project</th>
              <th>Batch</th>
              <th>Course Status</th>
              <th>Placement Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                
                <td>{item.name}</td>
                <td>{item.CourseName}</td>
                <td>{item.Project}</td>
                <td>{item.Batch}</td>
                <td>{item.CourseStatus}</td>
                <td>
                  {item.placementStatus}
                </td>
                <td>
                <a  className="text-danger mr-2" 
                       onClick={() => {
                         const confirmBox = window.confirm(
                           "Do you really want to delete "+ item.name
                         )
                         if (confirmBox === true) {
                           deleteRecord(item._id)
                         }
                       }}>
                         <i class="far fa-trash-alt" style={{fontSize:"18px",marginRight:"5px"}}></i> </a>
                        
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
}

export default Trainer