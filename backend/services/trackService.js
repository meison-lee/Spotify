const db = require('../db');

const createTrack = async (track_name, track_length, albumID, artistID) => {
  try{
    const query = "INSERT INTO tracks (track_name, track_length, albumID, artistID) VALUES ($1, $2, $3, $4) returning *";
    const values = [track_name, track_length, albumID, artistID];
    const result = await db.query(query, values);

    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}


const getAllTracks = async () => {
  try{
    const query = "SELECT * FROM tracks";

    const result = await db.query(query);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

const getTracksByAlbumID = async (albumID) => {
  try{
    const query = "SELECT t.*, a.*, ar.artist_name FROM tracks t JOIN albums a ON t.albumid = a.albumid JOIN artists ar ON a.artistid = ar.artistid WHERE a.albumID = $1";
    const values = [albumID];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

module.exports = {
  createTrack,
  getAllTracks,
  getTracksByAlbumID
};