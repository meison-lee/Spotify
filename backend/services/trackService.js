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

module.exports = {
  createTrack,
};