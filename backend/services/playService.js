const db = require('../db');

const playTrack = async () => {
  try{
    const query = "SELECT * FROM songs WHERE trackID = $1";
    const result = await db.query(query);
    console.log(result.rows);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

module.exports = {
  playTrack
}