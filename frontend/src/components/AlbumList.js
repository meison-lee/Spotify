import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import TrackList from './TrackList';
const backendURL = process.env.REACT_APP_BACKEND_URL ? process.env.REACT_APP_BACKEND_URL : 'http://localhost:3001';

const AlbumList = () => {
  const { albumID } = useParams(); // Fetch playlist ID from URL params
  const [album, setAlbum] = useState({});
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchAlbum = async () => {
    try {
      console.log("fetching metadata of Album")
      const response = await axios.get(backendURL+`/api/v1/album/${albumID}`);
      const data = response.data[0];
      setAlbum(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  async function fetchTracks() {
    try {
      console.log("fetching tracks of Album")
      const response = await axios.get(backendURL+`/api/v1/track/${albumID}`);
      console.log("response", response.data);
      setTracks(response.data);
    } catch (error) {
      console.error('Failed to fetch playlist data', error);
    }
  }

  useEffect(() => {
    fetchAlbum();
    fetchTracks();
  }, [])


  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="album-page">
      {album ? (
        <>
          <div className="album-header">
            <img
              src={require(`../covers/${album.album_artwork}.jpg`)}
              alt={`${album.album_name} cover`}
              className="album-cover"
            />
            <div className="album-details">
              <h1>{album.album_name}</h1>
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

export default AlbumList;
