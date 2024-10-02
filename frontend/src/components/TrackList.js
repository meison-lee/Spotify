import React from 'react';
import DropdownMenu from './DropDownMenu';


const TrackList = (tracks) => {

  const handlePlay = (track_name) => {
    alert(`Playing track ${track_name}`);
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
          <div style={{ flexGrow: 2, display: 'flex', flexDirection: 'column', marginRight: '15px', width: '200px'}}>
            <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {track.track_name}
            </div>
            <div style={{ color: '#555', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {track.artist_name}
            </div>
          </div>
          {/* Album */}
          <div style={{ flexGrow: 1, textAlign: 'left', marginRight: '15px', width: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {track.album_name}
          </div>
          {/* Length */}
          <div style={{ minWidth: '50px', textAlign: 'right', width: '50px' }}>
            {`${Math.floor(track.track_length / 60)}:${(track.track_length % 60).toString().padStart(2, '0')}`}
          </div>
          {/* Three Dots Menu */}
          <div style={{ position: 'relative', marginLeft: '15px', width: '30px' }}>
            <DropdownMenu track={track} />
          </div>
        </div>
      )): <div>Loading...</div>}
    </div>
  );
};

export default TrackList;
