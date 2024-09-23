import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';


const TrackList = (album_name, artist) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    async function fetchTracks() {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/track`);
        console.log("response", response.data[0]);
        setTracks(response.data);
      } catch (error) {
        console.error('Failed to fetch playlist data', error);
      }
    }
    fetchTracks();
  }, [])


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
          {/* Cover */}
          <img
            src={track.track_artwork}
            alt={`${track.track_name} cover`}
            style={{ width: '50px', height: '50px', marginRight: '15px' }}
          />
          {/* Track details */}
          <div style={{ flexGrow: 1 }}>
            <div style={{ fontWeight: 'bold' }}>{track.track_name}</div>
            <div style={{ color: '#555' }}>{track.artistID}</div>
          </div>
          {/* Album */}
          <div style={{ flexGrow: 1 }}>{track.albumID}</div>
          {/* Length */}
          <div>{track.track_length}</div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;
