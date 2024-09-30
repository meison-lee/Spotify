import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3001';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ username, email });
    const user = { username, email };
    const response = await axios.post(backendURL+'/api/v1/user', user);

    console.log('User created:', response.data);
    setSubmitted(true); // For demo, indicate that the form was submitted
    setTimeout(() => {
      navigate('/auth'); // Navigate to home ("/" is the route to the login page)
    }, 2000);
  };

  return (
    <div className="signup-page">
      <h2>Sign Up</h2>
      {submitted ? (
        <div className="success-message">
          <p>Thank you for signing up!</p>
          <p>Redirecting to login page...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <button className='login-button' type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}

export default SignupPage;
