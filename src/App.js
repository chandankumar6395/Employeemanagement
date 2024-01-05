
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './components/EmployeeList';
import EmployeeForm from './components/EmployeeForm';
import EditEmployee from './components/EditEmployee';

function App() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/EmployeeForm" element={<EmployeeForm />} />
          <Route path="/EditEmployee/:employeeId" element={<EditEmployee />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;
