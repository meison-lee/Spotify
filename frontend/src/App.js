import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import AlbumList from './components/AlbumList';
import Home from './components/Home';
import Playlist from './components/Playlist';
import ProtectedLayout from './components/ProtectedLayout';
import axios from 'axios';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if the user is logged in on component mount (using localStorage)
  useEffect(() => {
    console.log("in App page");

    async function checkUser(storedUser) {
        try {
            const result = await axios.post('http://localhost:3001/api/v1/user/check', storedUser);
            return result.data;
        } catch (error) {
            console.error("Error checking user:", error);
            return null;
        }
    }

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
        checkUser(storedUser).then(result => {
            if (result && result.success) {
                console.log("user exists");
                setIsAuthenticated(true);
            } else {
                console.log("user does not exist");
                setIsAuthenticated(false);
            }
        });
    } else {
        setIsAuthenticated(false);
        console.log("set to false");
    }
}, []);

  // Handler for setting login state and storing it in localStorage
  const handleLogin = () => {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true');
  };

  // Handler for logging out (if needed) and clearing localStorage
//   const handleLogout = () => {
//       setIsAuthenticated(false);
//       localStorage.removeItem('isAuthenticated');
//   };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                    <Route element={<ProtectedLayout isAuthenticated={isAuthenticated}/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/playlist/:playlistId" element={<Playlist />} />
                        <Route path="/album/:albumID" element={<AlbumList />} />
                    </Route>
                </Routes>
            </div>
        </Router>
    );
}

export default App;
