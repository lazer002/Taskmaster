import React, { useState } from 'react';
import axios from 'axios';
import logo from '../assets/logo.svg';
import { Link } from "react-router-dom";

function Signup() {
  const [user, setUser] = useState({
    Email: '', Password: ''
  });

  const handleinp = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({ ...prevState, [name]: value }));
  };

  const postdata = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/Signup', user);
      if (res.status === 200) {
        alert("Signup successful!"); 
        document.querySelector('.page').click();
      } else {
        alert("Signup failed."); 
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="glass">
            <div className='left_side'>
              <div className=''>
                <img src={logo} alt="" style={{width:'50%',marginBottom:'4rem'}}/>
              
                <h1>Welcome to Our User Sign Up Page</h1>
                <p>We offer a range of tech services to suit your vision and budget. Answer a few questions and we'll give you a quote for our services.</p>
              </div>
            </div>
            <div className="right_side" >
            <h1>User Sign Up</h1>
              <input type="text" name='Email' value={user.Email} onChange={handleinp} placeholder="Enter Your Email" className='form-control'/>
              <input type="password" name='Password' value={user.Password} onChange={handleinp} placeholder="Enter Your Password"  className='form-control'/>
              <button type="submit" onClick={postdata}>Sign Up</button>
              <button type="submit" className='viewpage'>
                <Link to="/Login" className='page'>Log In</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
