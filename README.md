# Spotify

## Overview

This is a Spotify-like project aims to produce a music platform. The project is built in NodeJS and React, the database is using Postgres and decide to use S3 to keep our audio and images.
Also, I am looking forward to fetch some data from Spotify's API to make the dataset realistic, my current data is generate by ChatGPT~~

## Features

- **User Management**: Seperate the user and artist, and they might have different interface. However, I am only working on user's interface right now, and I will soon finish the user login and signup interdace.
- **Playlists**: Create and add tracks into your playlists, there will be a playlist page.
- **Albums**: List all Albums.
- **Play Music**: Play individual tracks. (Showing alert sign right now, and I haven't work on the audio storage currently)
- **Music Search**: Search for songs, albums, and artists. (Not yet implemented)

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [PostgreSQL](https://www.postgresql.org/) (version 12 or later)

### Setup

1. **Clone the repository**:
   git clone https://github.com/yourusername/Spotify.git
   cd Spotify
2. **Install Dependencies**:
   npm install
3. **Run the App**:
   npm start
