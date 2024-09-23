const traclService = require('../services/trackService');

const createTrack = async (req, res) => {
  try {
    const { track_name, track_length, albumID, artistID } = req.body;
    const result = await trackService.createTrack(track_name, track_length, albumID, artistID);
    res.status(201).send({msg:'Track created', result});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  createTrack,
};