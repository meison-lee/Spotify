const db = require('../db');


// Function to get all album
const getAlbum = async (albumID) => {
  try{
    const query = "SELECT * FROM albums WHERE albumID = $1";
    const values = [albumID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

// Function to create a album
const createAlbum = async (artist_name, album_name, release_date) => {
  try {
    let query = "SELECT artistID FROM artists WHERE LOWER(artist_name) = LOWER($1)";
    let result = await db.query(query, [artist_name]);

    let artistID;

    console.log(result.rows);

    if (result.rows.length > 0) {
      // Artist exists, retrieve artistID
      artistID = result.rows[0].artistid;
    } else {
      throw new Error("Artist does not exist");
    }

    // Insert new album
    query = "INSERT INTO albums (artistID, album_name, release_date) VALUES ($1, $2, $3) RETURNING *";
    const values = [artistID, album_name, release_date];
    const albumResult = await db.query(query, values);

    return albumResult.rows[0];
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
  createAlbum,
  deleteAlbum,
};