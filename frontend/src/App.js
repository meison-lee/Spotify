import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Home from './components/Home';
import TrackList from './components/TrackList';
import AlbumList from './components/AlbumList';
import Playlist from './components/Playlist';
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
  // const handleLogout = () => {
  //     setIsAuthenticated(false);
  //     localStorage.removeItem('isAuthenticated');
  // };

    return (
        <Router>
            <div className="App">
                <Routes>
                    {/* Route for the login/signup page */}
                    <Route path="/auth" element={isAuthenticated? <Navigate to="/home"/> : <Auth onLogin={handleLogin} />} />

                    {/* Protected route for Home, navigates back to auth if not authenticated */}
                    <Route
                        path="/home"
                        element={isAuthenticated ? <AlbumList /> : <Navigate to="/auth" />}
                    />
                    <Route
                        path="/playlist/:playlistId"
                        element={isAuthenticated ? <Playlist /> : <Navigate to="/auth" />}
                    />
                    <Route
                        path="/album/:albumID"
                        element={isAuthenticated ? <TrackList /> : <Navigate to="/auth" />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
