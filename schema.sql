-- schema.sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS users (
    userID UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_playlists INTEGER[] DEFAULT '{}'
);
CREATE TABLE IF NOT EXISTS artists (
    artistID UUID PRIMARY KEY,
    artist_name VARCHAR(50) NOT NULL,
    artist_email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    artist_albums INTEGER[] DEFAULT '{}'
);

CREATE TABLE IF NOT EXISTS albums (
    albumID BIGSERIAL PRIMARY KEY,
    artistID INT NOT NULL,
    album_name VARCHAR(50) NOT NULL,
    album_artwork VARCHAR(100) NOT NULL, -- URL to the album artwork
    album_release_date DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS songs (
    songID BIGSERIAL PRIMARY KEY,
    song_name VARCHAR(50) NOT NULL,
    song_length INT NOT NULL, -- in seconds
    song_url VARCHAR(100) NOT NULL, -- URL to the song
    song_artwork VARCHAR(100) NOT NULL, -- URL to the song artwork
    albumID INT REFERENCES albums(albumID),
    artistID UUID REFERENCES artists(artistID)
);

CREATE TABLE IF NOT EXISTS playlists (
    playlistID BIGSERIAL PRIMARY KEY,
    playlist_name VARCHAR(50) NOT NULL,
    playlist_songs INTEGER[] DEFAULT '{}',
    userID UUID REFERENCES users(userID)
);