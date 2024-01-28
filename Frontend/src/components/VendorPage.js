// VendorPage.js

import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import VendorSignup from './VendorSignup';
const VendorPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [flag, setflag] = useState('');
  const [name,setName] = useState('');
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setflag(localStorage.getItem('token'));
      setName(localStorage.getItem('name'));
    }
  },[]);
  const handleLogin = async () => {
    // Add your login logic here using shopId and password
    if (email && password) {
      console.log('Login clicked. Shop ID:', email, 'Password:', password);
      // Replace the console.log with your actual login action
    } else {
      alert('Please enter Shop ID and Password');
    }

    try {
      // Make a POST request to the backend API
      const data = {
        "contactMail": email,
        "password": password

      }
      //console.log(JSON.stringify(data));
      const response = await fetch('http://localhost:27017/api/v1/vendor/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
    if(result.success===true){
      localStorage.setItem('token',result.token);
      localStorage.setItem('name',result.vendor.name);
      setflag(result.token);
      setName(result.vendor.name)
    }
    
    } catch (error) {
      // Handle errors (show an error message to the user)
      console.error(error.response.data);
    }
  };

  return (
    <div>
      {flag!==''?alert("loggedin"):
    <div className='outer'>
      <div className='container'>
        <h3>Login</h3>
        {/* Add your login form with event handlers */}
        <form>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <div className="button-container">
          <button type="button" className="login-button" onClick={handleLogin}>
            Login
          </button>
          <Link to="/">
          <button type="button" className="back-button">
            Back
          </button>
        </Link>
          </div>
        </form>
      

      {/* Registration Section */}
      <div>
        
        <p>Are you new to Campus Bazar? Register now to start selling!</p>
        {/* Link to the registration page */}
        <Link to="/vendorregistration">Register</Link>
      </div>
      </div>
    </div>
}
</div>
  );
};

export default VendorPage;
