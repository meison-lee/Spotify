const db = require('../db');


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

// Function to get playlist by user
const getPlaylist = async (userID) => {
  try{
    const query = "SELECT playlist_name FROM playlists WHERE userID = $1";
    const values = [userID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}


// Function to delete an artist
const deleteArtist = async (id) => {
  try {

    // delete the albums first
    // get the albums from artist and delete them

    // const query = "DELETE FROM artists WHERE userID = $1";
    // const values = [id];
    // const result = await db.query(query, values);
    // return result.rows;
  }
  catch (err) {
    throw new Error(err);
  }
}



module.exports = {
  createPlaylist,
  getPlaylist,
  deleteArtist
};