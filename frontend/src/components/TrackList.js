import React from 'react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import DropdownMenu from './DropDownMenu';
import axios from 'axios';


const TrackList = (tracks) => {
  // const [tracks, setTracks] = useState([]);
  const [activeTrack, setActiveTrack] = useState(null);
  const params = useParams();
  const albumID = params.albumID;

  useEffect(() => {

    console.log("tracks", tracks.tracks);

    // async function fetchTracks() {
    //   try {
    //     const response = await axios.get(`http://localhost:3001/api/v1/track/${albumID}`);
    //     fetchPlaylists();
    //     setTracks(response.data);
    //   } catch (error) {
    //     console.error('Failed to fetch playlist data', error);
    //   }
    // }
    // fetchTracks();
  }, [])

  const handlePlay = (track_name) => {
    alert(`Playing track ${track_name}`);
  }
  const handleAddToPlaylist = (trackId, playlistId) => {
    console.log(`Adding track ${trackId} to playlist ${playlistId}`);
    const response = axios.post(`http://localhost:3001/api/v1/playlist/${playlistId}`, {trackID: trackId});
    console.log(response);

    // Add your add-to-playlist logic here (e.g., axios call to backend)
  };


  return (
    <div style={{ padding: '20px' }}>
      {tracks ? tracks.tracks.map((track) => (
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
            onClick={() => handlePlay(track.trackid)}
          >
            <img
              src="https://img.icons8.com/ios-filled/50/000000/play.png"
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
          <div>{`${Math.floor(track.track_length / 60)}:${(track.track_length % 60).toString().padStart(2, '0')}`}</div>
          {/* Three Dots Menu */}
          <div style={{ position: 'relative', marginLeft: '15px' }}>
            <DropdownMenu track={track}/>
            {/* <button
              style={{
                backgroundColor: 'transparent',
                border: 'None',
                cursor: 'pointer',
                color:'black',
                fontSize: '20px',
              }}
              onClick={() => {
                fetchPlaylists();
                setActiveTrack(activeTrack === track.trackid ? null : track.trackid)
              }
              }
            >
              +
            </button>
            {activeTrack === track.trackid && (
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
            )} */}
          </div>
        </div>
      )): <div>Loading...</div>}
    </div>
  );
};

export default TrackList;
