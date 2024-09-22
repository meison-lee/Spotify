import React from 'react';
import MusicPlayer from './MusicPlayer';
import MusicUploader from './MusicUploader';

const Home = ({ accountType }) => {

    console.log("in home page")
    return (
        <div className="home-container">
            <h1>Welcome, {accountType === 'artist' ? 'Artist' : 'User'}!</h1>
            <MusicPlayer />
            {accountType === 'artist' && <MusicUploader />}
        </div>
    );
};

export default Home;
