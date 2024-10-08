const db = require('../db');


// Function to get all users
const getArtist = async (artistID) => {
  try{
    const query = "SELECT * FROM artists WHERE artistID = $1";
    const values = [artistID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const getIDFromArtistName = async (artist_name) => {
  try {
    const query = "SELECT artistID FROM artists WHERE artist_name = $1";  // Use $1 as a placeholder
    const values = [artist_name];  // This will bind to $1
    const result = await db.query(query, values);  // Pass query and values
    return result.rows[0].artistid;

  }
  catch (err) {
    throw new Error(err);
  }
}

// Function to create a user
const createArtist = async (artist_name, email) => {
  try {
    const query = "INSERT INTO artists (artist_name, email) VALUES ($1, $2)";
    const values = [artist_name, email];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch (err) {
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
  getArtist,
  createArtist,
  deleteArtist,
  getIDFromArtistName
};