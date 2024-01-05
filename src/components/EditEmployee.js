import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const EditEmployee = () => {
  const navigate = useNavigate();

  const {employeeId} = useParams(); 

  const [employee, setEmployee] = useState({
    name: '',
    dob: '',
    salary: '',
    joiningDate: '',
    relievingDate: '',
    contact: '',
    status: '',
  });

  useEffect(() => {
    console.log("Fetching data for employeeId:", employeeId);
    axios.get(`http://localhost:4001/getUserDetail?_id=${employeeId}`)
      .then(response => {
        const { name, dob, salary, joiningDate, relievingDate, contact, status } = response.data.data;
        console.log("Fetched data:", response.data);
        setEmployee({
          name,
          dob,
          salary,
          joiningDate,
          relievingDate,
          contact,
          status,
        });
      })
      .catch(error => console.error('Error fetching employee details:', error));
  }, [employeeId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:4001/updateUser?_id=${employeeId}`, employee)
      .then(response => {
        console.log('Employee updated successfully:', response.data);
        navigate('/');
      })
      
      .catch(error => console.error('Error updating employee:', error));
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee(employee => ({ ...employee, [name]: value }));

  };
  return (
    <div>
      <h2>Edit Employee</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name (mandatory):
          <input
            type="text"
            name="name"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          DOB:
          <input
            type="date"
            name="dob"
            value={employee.dob}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Salary:
          <input
            type="text"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Joining Date:
          <input
            type="date"
            name="joiningDate"
            value={employee.joiningDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Relieving Date:
          <input
            type="date"
            name="relievingDate"
            value={employee.relievingDate}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Contact:
          <input
            type="text"
            name="contact"
            value={employee.contact}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Status (active/inactive):
          <select
            name="status"
            value={employee.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </label>
        <br />
        <button type="submit">Update Employee</button>
      </form>
    </div>
  );
};
export default EditEmployee;
