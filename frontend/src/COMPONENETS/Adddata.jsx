import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';


const courses = [
  { value: '', label: 'Choose...' },
  { value: 'FSD', label: 'FSD' },
  { value: 'DSA', label: 'DSA' },
  { value: 'ML-AI', label: 'ML-AI' },
  { value: 'RPA', label: 'RPA' },
  { value: 'ST', label: 'ST' },
  { value: 'CSA', label: 'CSA' },
];

const projects = [
  { value: '', label: 'Choose...' },
  { value: 'ICTAK', label: 'ICTAK' },
  { value: 'KKEM', label: 'KKEM' },
  { value: 'NORKA', label: 'NORKA' },
  { value: 'ABCD', label: 'ABCD' },
  { value: 'KDISC', label: 'KDISC' },
];

const batches = [
  { value: '', label: 'Choose...' },
  { value: 'May_22', label: 'May_22' },
  { value: 'Jun_22', label: 'Jun_22' },
  { value: 'Jul_22', label: 'Jul_22' },
  { value: 'Aug_22', label: 'Aug_22' },
];

const courseStatuses = [
  { value: '', label: 'Choose...' },
  { value: 'Qualified', label: 'Qualified' },
  { value: 'Incompetent', label: 'Incompetent' },
];

const Adddata = () => {
   
    const [name, setLearnerName] = useState('');
    const [CourseName, setCourse] = useState('');
    const [Project, setProject] = useState('');
    const [Batch, setBatch] = useState('');
    const [CourseStatus, setCourseStatus] = useState('');
    const navigate = useNavigate();
    
    const backUser = () => {
      navigate('/trainer')
  }
   
  const handleSubmit = async (event) => {
      event.preventDefault();
      if( name == '' || CourseName == '' || Project == '' || Batch == '' || CourseStatus== '')
      {
        return alert("All fields are required")
      }
      const newLearnerData = {
        
        name,
        CourseName,
        Project,
        Batch,
        CourseStatus,
      };
  
      try {
        await axios.post('http://localhost:3001/students', newLearnerData);
        alert('Data submitted successfully!');
        navigate('/trainer')
        
        setLearnerName('');
        setCourse('');
        setProject('');
        setBatch('');
        setCourseStatus('');
      } catch (error) {
        console.error(error);
      }
   
    };
  
    return (
      <>
     
      <form
        style={{
          
          width: '55%',
          height:'75vh',
          boxShadow: '5px 5px 5px gray',
          border:"1px solid black",
          borderRadius: '15px',
          marginTop:"5%",
          marginLeft:"23%",
          backgroundColor: 'lightblue'
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-row">
          
      <div className="form-group col-md-8">
        <label htmlFor="inputLearnerName"
                      style={{marginLeft:"60%",
                      marginTop:"2%"
                    }}>Student Name</label>
        <input
         style={{
          marginTop:"2%",
          marginLeft:"25%",
          padding:'10px'
        }}
          type="text"
          className="form-control"
          id="inputLearnerName"
          placeholder=" name"
          value={name}
          onChange={(event) => setLearnerName(event.target.value)}
        />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-8">
        <label htmlFor="inputCourse"
                      style={{marginLeft:"60%",
                      marginTop:"2%"
                    }}>Course Name</label>
        <select
         style={{
          marginTop:"2%",
          marginLeft:"25%",
          padding:'10px'
        }}
          id="inputCourse"
          className="form-control"
          value={CourseName}
          onChange={(event) => setCourse(event.target.value)}
        >
          {courses.map((course, index) => (
            <option key={index} value={course.value}>
              {course.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-md-8">
        <label htmlFor="inputProject"
                        style={{marginLeft:"60%",
                        marginTop:"2%"
                      }}>Project Name</label>
        <select
         style={{
          marginTop:"2%",
          marginLeft:"25%",
          padding:'10px'
        }}
          id="inputProject"
          className="form-control"
          value={Project}
          onChange={(event) => setProject(event.target.value)}
        >
          {projects.map((project, index) => (
            <option key={index} value={project.value}>
              {project.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-8">
        <label htmlFor="inputBatch"
                    style={{marginLeft:"60%",
                    marginTop:"2%"
                  }}>Batch</label>
        <select
           style={{
            marginTop:"2%",
            marginLeft:"25%",
            padding:'10px'
          }}
          id="inputBatch"
          className="form-control"
          value={Batch}
          onChange={(event) => setBatch(event.target.value)}
        >
          {batches.map((batch, index) => (
            <option key={index} value={batch.value}>
              {batch.label}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group col-md-8 ">
        <label htmlFor="inputCourseStatus"
                 style={{marginLeft:"60%",
                          marginTop:"2%"
                        }}>Course Status</label>
        <select
          style={{
            marginTop:"2%",
            marginLeft:"25%",
            padding:'10px'
          }}
          id="inputCourseStatus"
          className="form-control"
          value={CourseStatus}
          onChange={(event) => setCourseStatus(event.target.value)}
        >
          {courseStatuses.map((courseStatus, index) => (
            <option key={index} value={courseStatus.value}>
              {courseStatus.label}
            </option>
          ))}
        </select>
      </div>
    </div>
    <button style={{marginTop:"6%", marginLeft:"35%",width:'200px'}}  type="submit" className="btn btn-primary">
      Submit
    </button>
   
  </form>
  <br />
  </>
    )}

export default Adddata