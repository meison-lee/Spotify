import React, { useState } from 'react';

const MusicUploader = () => {
    const [musicFile, setMusicFile] = useState(null);

    const handleUpload = () => {
        if (musicFile) {
            alert(`Music uploaded: ${musicFile.name}`);
        } else {
            alert('Please select a file!');
        }
    };

    return (
        <div className="music-uploader">
            <h2>Upload Music</h2>
            <input
                type="file"
                accept="audio/*"
                onChange={(e) => setMusicFile(e.target.files[0])}
            />
            <br />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default MusicUploader;
