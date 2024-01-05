import './AddEmployee.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const EmployeeList = ({ onDeleteEmployee }) => {
  const [employees, setEmployees] = useState([]);
  console.log("set",employees);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4001/getUser');
      console.log("data",response);
      setEmployees(response.data.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleDeleteClick = async (_id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this employee?');
  
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4001/deleteUser/${_id}`);
        onDeleteEmployee(_id);
      } catch (error) {
        console.error('Error deleting employee:', error, 'Employee ID:', _id);
      }
    };
  };

  return (
    <div>
      <Link to="/EmployeeForm">
        <button>Add Employee</button>
      </Link>
      <h2>Employee Table</h2>

      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>DOB</th>
            <th>Salary</th>
            <th>Joining Date</th>
            <th>Relieving Date</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.dob}</td>     
              <td>{employee.salary}</td>
              <td>{employee.joiningDate}</td>
              <td>{employee.relievingDate}</td>
              <td>{employee.contact}</td>
              <td>{employee.status}</td>
              <td>
                <Link to={`/EditEmployee/${employee._id}`}>
                  <FontAwesomeIcon icon={faEdit} />
                </Link>
              </td>
              <td>
               
                <button onClick={() => handleDeleteClick(employee._id)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
