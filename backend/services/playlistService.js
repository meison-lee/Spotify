const db = require('../db');


// Function to get playlist by user
const getPlaylists = async (userID) => {
  try{
    const query = "SELECT playlistID, playlist_name FROM playlists WHERE userID = $1";
    const values = [userID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

// Function to get all users
const createPlaylist = async (userID, playlist_name) => {
  try{
    const query = "INSERT INTO playlists (userID, playlist_name) VALUES ($1, $2)";
    const values = [userID, playlist_name];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const deletePlaylist = async (playlistID) => {
  try{
    const query = "DELETE FROM playlists WHERE playlistID = $1";
    const values = [playlistID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const getTracks = async (playlistID) => {
  try{
    const query = "SELECT track_name, track_length, albumID, artistID FROM playlist_track JOIN tracks ON playlist_track.playlistID = playlistID WHERE playlist_track.playlistID = $1";
    const values = [playlistID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}


const addTrack = async (playlistID, trackID) => {
  try{
    const query = "INSERT INTO playlist_track (playlistID, trackID) VALUES ($1, $2)";
    const values = [playlistID, trackID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const removeTrack = async (playlistID, trackID) => {
  try{
    const query = "DELETE FROM playlist_track WHERE playlistID = $1 AND trackID = $2";
    const values = [playlistID, trackID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}



module.exports = {
  createPlaylist,
  getPlaylists,
  getTracks,
  addTrack,
  removeTrack
};