// Sidebar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3001';

const Sidebar = ({onLogout}) => {
  const [playlists, setPlaylists] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();


  const fetchPlaylists = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(backendURL+`/api/v1/playlist/user/${storedUser.username}`);
    const data = response.data;
    setPlaylists(data);
  };

  const createPlaylist = async () => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    const playlistName = prompt('Enter a playlist name');
    if (playlistName.trim() === '') {
      alert('Please enter a playlist name');
      return;
    }
    const data = {playlist_name: playlistName, username: storedUser.username}
    console.log(data);
    const response = await axios.post(backendURL+`/api/v1/playlist`, data);
    console.log(response);
    fetchPlaylists();
  }

  const onClickPlaylist = (playlistid) => {
    // Navigate to the playlist page
    console.log("playlistid", playlistid);
    navigate(`/playlist/${playlistid}`);
  };

  const goToHome = () => {
    navigate('/');
  }

  const logout = () => {
    localStorage.removeItem('user');
    onLogout();
    navigate('/');
  }

  useEffect(() => {
    // Fetch user's playlists (replace with your actual API)
    fetchPlaylists();
  }, []);

  return (
  <div className="sidebar">
    {/* Home Button */}
    <button className="home-button" onClick={() => goToHome()}>
      Home
    </button>

    {/* Search Bar */}
    <input
      type="text"
      className="search-bar"
      placeholder="Search playlists..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    {/* Playlists */}
    <h3>Your Playlists</h3>
    <ul>
      {playlists.map((playlist) => (
        <li
          key={playlist.playlistid}
          onClick={() => onClickPlaylist(playlist.playlistid)}
        >
          {playlist.playlist_name}
        </li>
      ))}
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'None',
          cursor: 'pointer',
          fontSize: '20px',
          color: 'gray',
        }}
        onClick={createPlaylist}
      >
        +
      </button>
    </ul>
    <button className="logout-button" onClick={() => logout()}>
      Logout
    </button>
  </div>
  );
};

export default Sidebar;
