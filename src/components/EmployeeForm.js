import React, { useState } from 'react';
import axios from 'axios';
import './AddEmployee.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [employeeFormData, setEmployeeFormData] = useState({
    name: '',
    dob: '',
    salary: '',
    joiningDate: '',
    relievingDate: '',
    contact: '',
    status: true,
  });

  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();

    try {

      const response = await axios.post('http://localhost:4001/addUser', employeeFormData);
      console.log('Employee added:', response.data);
      setEmployeeFormData({
        name: '',
        dob: '',
        salary: '',
        joiningDate: '',
        relievingDate: '',
        contact: '',
        status: true,
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
      setError('Error adding employee. Please try again.');
    }
  };

  return (
    <>
      <div className="employee-form-container">
        <h2>Add Employee</h2>
        <form className="employee-form">  
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={employeeFormData.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">DOB:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={employeeFormData.dob}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salary:</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={employeeFormData.salary}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="joiningDate">Joining Date:</label>
            <input
              type="date"
              id="joiningDate"
              name="joiningDate"
              value={employeeFormData.joiningDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="relievingDate">Relieving Date:</label>
            <input
              type="date"
              id="relievingDate"
              name="relievingDate"
              value={employeeFormData.relievingDate}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="contact">Contact:</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={employeeFormData.contact}
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={employeeFormData.status}
              onChange={handleInputChange}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="button" onClick={handleAddEmployee}>
            Add Employee
          </button>
        </form>
      </div>
    </>
  );
};

export default EmployeeForm;
