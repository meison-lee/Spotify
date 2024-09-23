import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MusicPlayer from './MusicPlayer'; // Assuming you have this component
import MusicUploader from './MusicUploader'; // Assuming you have this component
import axios from 'axios';

const Home = ({ accountType }) => {
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const navigate = useNavigate();

    // Fetch user's playlists when the component mounts
    useEffect(() => {
        async function fetchPlaylists() {
            try {
                const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage

                const result = await axios.get(`http://localhost:3001/api/v1/playlist/user/${storedUser.username}`);

                console.log("Playlists:", result.data);
                setPlaylists(result.data);
            } catch (error) {
                console.error("Error fetching playlists:", error);
            }
        }
        fetchPlaylists();
    }, []);

    // Handle adding a new playlist
    const handleAddPlaylist = async () => {
        if (newPlaylistName.trim() === '') {
            return; // Don't add empty playlists
        }

        try {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            console.log("playlist name", newPlaylistName);
            console.log("stored user", storedUser);
            const data = { playlist_name: newPlaylistName, username: storedUser.username };

            const result = await axios.post('http://localhost:3001/api/v1/playlist', data);

            setPlaylists([...playlists, result.data]); // Add new playlist to the list
            setNewPlaylistName(''); // Clear the input after adding
        } catch (error) {
            console.error("Error adding playlist:", error);
        }
    };

    const handleClick = (playlistId) => {
        navigate(`/playlist/${playlistId}`);
    };

    return (
        <div className="home-container">
            <h1>Welcome, {accountType === 'artist' ? 'Artist' : 'User'}!</h1>
            <MusicPlayer />
            {accountType === 'artist' && <MusicUploader />}

            {/* Playlist Feature */}
            <div className="playlist-container">
                <h2>Your Playlists</h2>

                {/* Input for new playlist */}
                <div className="new-playlist">
                    <input
                        type="text"
                        placeholder="New Playlist Name"
                        value={newPlaylistName}
                        onChange={(e) => setNewPlaylistName(e.target.value)}
                    />
                    <button onClick={handleAddPlaylist}>+</button>
                </div>

                {/* List of playlists */}
                <div className="playlist-container">
                    {playlists && playlists.length > 0 ? (
                        <div className="playlist-grid">
                        {playlists.map((playlist, index) => (
                            <div className="playlist-card" key={index}
                            onClick={() => handleClick(playlist.playlistid)}>
                            <img
                                src={require(`../covers/cover-1.jpg`)}
                                alt={`${playlist.playlist_name} cover`}
                                className="playlist-cover"
                            />
                            <h3 className="playlist-name">{playlist.playlist_name}</h3>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <p>No playlists yet. Create one!</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
