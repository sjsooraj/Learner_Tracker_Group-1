import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar2 from "./Navbar2";

const PlacementOfficer = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3001/students")
      .then(response => setData(response.data))
      .catch(error => setError(error));
  }, []);

  const handlePlacementStatusChange = (event, learner) => {
    const newPlacementStatus = event.target.value;
    axios
      .put(`http://localhost:3001/api/students/${learner._id}`, {
        placementStatus: newPlacementStatus
      })
      .then(response => {
        setData(
          data.map(item =>
            item._id === response.data._id ? response.data : item
          )
        );
        window.alert("Placement Details Updated");
        window.location.reload();
      })
      .catch(error => setError(error));
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    <div>
      <Navbar2/>
    </div>
      <div className="container mt-4">
        
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Course Name</th>
              <th>Project</th>
              <th>Batch</th>
              <th>Course Status</th>
              <th>Placement Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                
                <td>{student.name}</td>
                <td>{student.CourseName}</td>
                <td>{student.Project}</td>
                <td>{student.Batch}</td>
                <td>{student.CourseStatus}</td>
                <td>
                  <select value={student.placementStatus} onChange={(event) => handlePlacementStatusChange(event, student)}>
                    <option value="Placed">Placed</option>
                    <option value="Job Seeking">Job Seeking</option>
                    <option value="not interested">Not Interested</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default PlacementOfficer