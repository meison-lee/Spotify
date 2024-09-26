// Sidebar.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [playlists, setPlaylists] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user's playlists (replace with your actual API)
    const fetchPlaylists = async () => {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const response = await axios.get(`http://localhost:3001/api/v1/playlist/user/${storedUser.username}`);
      const data = response.data;
      setPlaylists(data);
    };

    fetchPlaylists();
  }, []);

  const onClickPlaylist = (playlistid) => {
    // Navigate to the playlist page
    console.log("playlistid", playlistid);
    navigate(`/playlist/${playlistid}`);
  };

  return (
    <div className="sidebar">
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
      </ul>
    </div>
  );
};

export default Sidebar;
