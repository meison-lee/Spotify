import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TrackList from './TrackList';

const Playlist = () => {
  const { playlistId } = useParams(); // Fetch playlist ID from URL params
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Fetch the playlist details and tracks from your backend
    async function fetchPlaylist() {
      try {
        // const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming user is stored in localStorage
        const response = await axios.get(`http://localhost:3001/api/v1/playlist/${playlistId}`);
        setPlaylist(response.data.playlist);
        setTracks(response.data.tracks);
      } catch (error) {
        console.error('Failed to fetch playlist data', error);
      }
    }
    fetchPlaylist();
  }, [playlistId]);

  return (
    <div className="playlist-page">
      {playlist ? (
        <>
          <div className="playlist-header">
            <img
              src={playlist.cover_url}
              alt={`${playlist.playlist_name} cover`}
              className="playlist-cover"
            />
            <div className="playlist-details">
              <h1>{playlist.playlist_name}</h1>
              <p>{tracks.length} songs</p>
            </div>
          </div>

          <div className="tracks-table">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Artist</th>
                  <th>Album</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {tracks.map((track, index) => (
                  <tr key={track.trackID}>
                    <td>{index + 1}</td>
                    <td>{track.track_name}</td>
                    <td>{track.artist_name}</td>
                    <td>{track.album_name}</td>
                    <td>{Math.floor(track.track_length / 60)}:{track.track_length % 60 < 10 ? '0' : ''}{track.track_length % 60}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <TrackList />
      )}
    </div>
  );
};

export default Playlist;
