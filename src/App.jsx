import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Importing Axios for making HTTP requests
import './index.css';

const App = () => {
  // State variables for managing users list and form inputs
  const [users, setUsers] = useState([]); // Array of users
  const [name, setName] = useState(''); // Input for user's name
  const [email, setEmail] = useState(''); // Input for user's email
  const [password, setPassword] = useState(''); // Input for user's password

  // useEffect to fetch users data when the component mounts
  useEffect(() => {
    getUsers();
  }, []);

  // Function to fetch users data from the backend
  const getUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users'); // Making a GET request to fetch users
      setUsers(response.data); // Updating the users state with the data received
    } catch (error) {
      console.error(error); // Logging any errors to the console
    }
  };

  // Function to handle form submission when adding a new user
  const handleSubmit = async (e) => {
    e.preventDefault(); // Preventing default form submission behavior
    try {
      // Making a POST request to add a new user
      await axios.post('http://localhost:5000/api/users', {
        name,
        email,
        password
      });
      getUsers(); // Fetching updated users list after adding a new user
      setName(''); // Resetting name input
      setEmail(''); // Resetting email input
      setPassword(''); // Resetting password input
    } catch (error) {
      console.error(error); // Logging any errors to the console
    }
  };

  return (
    <div className="app">
      <h1>CRUD App</h1>
      {/* Form for adding a new user */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)} // Updating name state on input change
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // Updating email state on input change
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Updating password state on input change
          required
        />
        <button type="submit">Add User</button>
      </form>
      {/* Displaying the list of users */}
      <div className="user-list">
        {users.map((user) => (
          <div key={user._id} className="user">
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
