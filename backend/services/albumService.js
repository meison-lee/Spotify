const db = require('../db');


// Function to get all album
const getAlbum = async (albumID) => {
  try{

    console.log("in get album", albumID)
    const query = "SELECT * FROM albums WHERE albumID = $1";
    const values = [albumID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const getAllAlbums = async () => {
  try{
    const query = "SELECT * FROM albums";
    const result = await db.query(query);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

// Function to create a album
const createAlbum = async (artistID, album_name, release_date) => {
  try {

    // Insert new album
    const query = "INSERT INTO albums (artistID, album_name, release_date) VALUES ($1, $2, $3) RETURNING *";
    const values = [artistID, album_name, release_date];
    const result = await db.query(query, values);

    return result.rows[0];
  }
  catch (err) {
    throw new Error(err);
  }
}

// Function to delete an album
const deleteAlbum = async (albumID) => {
  try {

    const query = "DELETE FROM albums WHERE albumID = $1";
    const values = [albumID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch (err) {
    throw new Error(err);
  }
}



module.exports = {
  getAlbum,
  getAllAlbums,
  createAlbum,
  deleteAlbum,
};