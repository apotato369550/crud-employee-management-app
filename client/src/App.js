import './App.css';
import React, { useState } from 'react';
import Axios from 'axios';


// this won't post properly
function App() {
  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);
  const [newWage, setNewWage] = useState(0);

  const addEmployee = () => {
    // twas lacking /create
    Axios.post("http://localhost:3001/create", {
      name: name,
      age: age,
      country: country,
      position: position,
      wage: wage
    }).then(() => {
      setEmployeeList([
        ...employeeList, 
        {
          name: name,
          age: age,
          country: country,
          position: position,
          wage: wage
        }
      ])
    });
  }

  const getEmployees = () => {
    // this works:D
    Axios.get("http://localhost:3001/employees", {
    }).then((response) => {
      console.log(response);
      setEmployeeList(response.data);
    })
  }  

  // create update employee function

  // there is something wrong with the function below... wtafVVV
  // parenthesis was in the wrong place
  // test this
  const updateEmployeeWage = (id) => {
    Axios.put("http://localhost:3001/update", {wage: newWage, id: id}).then(
      (response) => {
        setEmployeeList(employeeList.map((val) => {
          return val.employee_id === id ? {
            id: val.employee_id,
            name: val.name,
            country: val.country,
            age: val.age,
            position: val.position,
            wage: newWage
          } : val
        }))
      }
    )
  }

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEmployeeList(employeeList.filter((val) => {
        return val.employee_id != id;
      }))
      // there was an additional equal sign
      // this works
      // commit it
      // sometimes it deletes everything(??)
      // compare code w/ source code
    })
  }

  // add delete employee function
  // learn about javascript promises
  return (
    <div className="App">
      <div className="information">
        <label>Name: </label>
        <input 
          type="text" 
          onChange={(event) => setName(event.target.value)}
        />

        <label>Age: </label>
        <input 
          type="number" 
          onChange={(event) => setAge(event.target.value)}
        />

        <label>Country: </label>
        <input 
          type="text" 
          onChange={(event) => setCountry(event.target.value)}
        />

        <label>Position: </label>
        <input 
          type="text" 
          onChange={(event) => setPosition(event.target.value)}
        />

        <label>Wage (year): </label>
        <input 
          type="number" 
          onChange={(event) => setWage(event.target.value)}
        />

        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <div className="employees">
        <button onClick={getEmployees}>Show Employees</button>
        {employeeList.map((val, key) => {
          return <div className="employee">
            <h3>Name: {val.name}</h3>
            <h3>Age: {val.age}</h3>
            <h3>Country: {val.country}</h3>
            <h3>Position: {val.position}</h3>
            <h3>Wage: {val.wage}</h3>
            <div>
              {" "}
              <input 
                type="text" 
                placeholder="Enter Wage..." 
                className="information"
                onChange={(event) => {
                  setNewWage(event.target.value);
                }}
              />
              <button onClick={() => {updateEmployeeWage(val.employee_id)}}>Update</button>
              <button onClick={() => deleteEmployee(val.employee_id)}>Delete</button>
            </div> 
          </div>
        })}
      </div>
    </div>
    // this works
    // just need to update the state
  );
}

export default App;
