import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const Auth = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    const checkUser = async (username) => {
        try {
            const result = await axios.post('http://localhost:3001/api/v1/user/check', { username });
            if (result.data && result.data.success) {
                console.log("User exists, navigating to home...");
                navigate("/"); // Navigate to home on successful login
            } else {
                console.log("User does not exist");
            }
        } catch (error) {
            console.error("Error checking user:", error);
        }
    };

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            console.log("Checking if user already logged in...");
            checkUser(storedUser.username);
        }
    }, []);

    const handleAuth = async (e) => {
        e.preventDefault();
        console.log("Checking user during login...");
        try {
            const result = await axios.post('http://localhost:3001/api/v1/user/check', { username });
            if (result.data && result.data.success) {
                console.log(`User ${username} logged in!`);
                // Store the user in localStorage after successful login
                localStorage.setItem('user', JSON.stringify({ username }));
                onLogin()
                navigate("/");
            } else {
                alert(result.data.msg)
                console.log(result.data.msg)
            }
        } catch (error) {
            console.error("Error during authentication:", error);
        }
    };

    const handleSignUp = ()=>{
        navigate("/signup");
    }

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <button className='login-button' onClick={handleAuth}>
                Login
            </button>
            <br />
            <button className='login-button' onClick={handleSignUp}>
                Signup
            </button>
            <br />
        </div>
    );
};

export default Auth;
