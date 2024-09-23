import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


const TrackList = (album_name, artist) => {
  const [tracks, setTracks] = useState([]);
  const params = useParams();
  const albumID = params.albumID;

  useEffect(() => {

    console.log("in track albumID", albumID);
    async function fetchTracks() {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/track/${albumID}`);
        console.log("response", response.data[0]);
        setTracks(response.data);
      } catch (error) {
        console.error('Failed to fetch playlist data', error);
      }
    }
    fetchTracks();
  }, [])

  const handlePlay = (track_name) => {
  alert(`Playing track ${track_name}`);
  }


  return (
    <div style={{ padding: '20px' }}>
      {tracks.map((track) => (
        <div
          key={track.trackid}
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 0',
            borderBottom: '1px solid #ddd',
          }}
        >
          {/* Play Button */}
          <button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              marginRight: '15px',
            }}
            onClick={() => handlePlay(track.trackid)} // Add your play function here
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/play.png" // Link to a play icon
              alt="Play"
              style={{ width: '20px', height: '20px' }}
            />
          </button>
          {/* Cover */}
          <img
            src={require(`../covers/${track.album_artwork}.jpg`)}
            alt={`${track.track_name} cover`}
            style={{ width: '50px', height: '50px', marginRight: '15px' }}
          />
          {/* Track details */}
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 'bold' }}>{track.track_name}</div>
            <div style={{ color: '#555' }}>{track.artist_name}</div>
          </div>
          {/* Album */}
          <div style={{ flexGrow: 1 }}>{track.album_name}</div>
          {/* Length */}
          <div>{`${Math.floor(track.track_length / 60)} : ${(track.track_length % 60).toString().padStart(2, '0')}`}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
