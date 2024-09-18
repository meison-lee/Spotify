-- schema.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS artists (
    artistID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artist_name VARCHAR(50) UNIQUE NOT NULL ,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS albums (
    albumID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    artistID UUID REFERENCES artists(artistID) ON DELETE CASCADE,
    album_name VARCHAR(50) NOT NULL,
    album_artwork VARCHAR(100) , -- URL to the album artwork
    release_date DATE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS songs (
    songID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    song_name VARCHAR(50) NOT NULL,
    song_length INT NOT NULL, -- in seconds
    song_url VARCHAR(100) , -- URL to the song
    song_artwork VARCHAR(100) , -- URL to the song artwork
    albumID UUID REFERENCES albums(albumID) ON DELETE CASCADE,
    artistID UUID REFERENCES artists(artistID) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS playlists (
    playlistID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    userID UUID REFERENCES users(userID),
    playlist_name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS playlist_song (
    playlistID UUID REFERENCES playlists(playlistID) ON DELETE CASCADE,
    songID UUID REFERENCES songs(songID) ON DELETE CASCADE,
    PRIMARY KEY (playlistID, songID)
);

CREATE TABLE IF NOT EXISTS user_plalist (
    userID UUID REFERENCES users(userID) ON DELETE CASCADE,
    playlistID UUID REFERENCES playlists(playlistID) ON DELETE CASCADE,
    PRIMARY KEY (userID, playlistID)
);



