import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const DropdownMenu = ({track}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const dropdownRef = useRef(null);

  const fetchPlaylists = async () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const response = await axios.get(`http://localhost:3001/api/v1/playlist/user/${storedUser.username}`);
    const data = response.data;
    setPlaylists(data);
  };

  // Toggle visibility of the list when the button is clicked
  const handleButtonClick = () => {
    fetchPlaylists();
    setIsVisible(!isVisible);
  };

  const handleAddToPlaylist = (trackId, playlistId) => {
    console.log(`Adding track ${trackId} to playlist ${playlistId}`);
    const response = axios.post(`http://localhost:3001/api/v1/playlist/${playlistId}`, {trackID: trackId});
    console.log(response);

    // Add your add-to-playlist logic here (e.g., axios call to backend)
  };

  // Handle click outside the dropdown to close the list
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsVisible(false); // Hide the list if clicked outside
    }
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
    const response = await axios.post(`http://localhost:3001/api/v1/playlist`, data);
    console.log(response);
    fetchPlaylists();
  }

  // Add the event listener when the dropdown is visible
  useEffect(() => {
    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Cleanup the event listener when the component unmounts
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  return (
    <div ref={dropdownRef}>
      <button
        style={{
          backgroundColor: 'transparent',
          border: 'None',
          cursor: 'pointer',
          fontSize: '20px',
          color: 'black',
        }}
        onClick={handleButtonClick}
      >
        +
      </button>

      {isVisible &&
      <div
      style={{
        position: 'absolute',
        top: '20px',
        right: '0',
        backgroundColor: 'white',
        border: '1px solid #ddd',
        borderRadius: '4px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 10,
        padding: '10px',
        width: '200px',
      }}
    >
        <div style={{
            padding: '5px 0',
            cursor: 'pointer',
          }}
          onClick={createPlaylist}
          >
            create a playlist...
        </div>
        {playlists.map((playlist) => (
        <div
          key={playlist.playlistid}
          style={{
            padding: '5px 0',
            cursor: 'pointer',
          }}
          onClick={() => handleAddToPlaylist(track.trackid, playlist.playlistid)}
        >
          {playlist.playlist_name}
        </div>
      ))}
      </div>
      }
    </div>
  );
};

export default DropdownMenu;
