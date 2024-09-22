import React from 'react';

const MusicPlayer = () => {
    const handlePlayMusic = () => {
        alert('Playing music...');
    };

    return (
        <div className="music-player">
            <h2>Music Player</h2>
            <button onClick={handlePlayMusic}>Play Music</button>
        </div>
    );
};

export default MusicPlayer;
