import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TrackList from './TrackList';
const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3001';

const Playlist = () => {
  const { playlistId } = useParams(); // Fetch playlist ID from URL params
  const [playlist, setPlaylist] = useState(null);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    // Fetch the playlist details and tracks from your backend

    async function fetchPlaylist() {
      try {
        const response = await axios.get(backendURL+`/api/v1/playlist/${playlistId}/details`);

        console.log("tracks", response.data);
        console.log("length of tracks", response.data.length);

        if (response.data.length === 0) {
          console.log("no tracks");
          const response = await axios.get(backendURL+`/api/v1/playlist/${playlistId}`);
          console.log("playlist", response.data[0].playlist_name)
          setPlaylist(response.data[0].playlist_name);
          setTracks([]);
        }else {
          console.log("tracks");
          setPlaylist(response.data[0].playlist_name);
          setTracks(response.data);
        }
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
              alt={`${playlist} cover`}
              className="playlist-cover"
            />
            <div className="playlist-details">
              <h1>{playlist}</h1>
              <p>{tracks.length} songs</p>
            </div>
          </div>

          <div className="tracks-table">
              <TrackList tracks={tracks} />
          </div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Playlist;
