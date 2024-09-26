const db = require('../db');


// Function to get playlist by user
const getPlaylists = async (userID) => {
  try{
    console.log("in getPlaylists")
    const query = "SELECT playlistID, playlist_name FROM playlists WHERE userID = $1";
    const values = [userID];
    const result = await db.query(query, values);
    console.log(result)
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
    console.log("in getTracks playlistID: ", playlistID)
    const query = `
      SELECT
        *
      FROM
        playlist_track pt
      JOIN
        tracks t ON pt.trackid = t.trackid
      JOIN
        playlists p ON pt.playlistid = p.playlistid  -- Join with the playlists table
      JOIN
        artists a ON t.artistid=a.artistid
      JOIN
        albums album ON t.albumid=album.albumid
      WHERE
        pt.playlistID = $1;
    `;
    const values = [playlistID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const getPlaylist = async (playlistID) => {
  try{
    const query = "SELECT * FROM playlists WHERE playlistid = $1";
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
  getPlaylist,
  addTrack,
  removeTrack
};