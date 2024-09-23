const trackService = require('../services/trackService');

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

const getAllTracks = async (req, res) => {
  try {
    const result = await trackService.getAllTracks();
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
const getTracksByAlbumID = async (req, res) => {
  try {
    const {albumID} = req.params;
    const result = await trackService.getTracksByAlbumID(albumID);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  createTrack,
  getAllTracks,
  getTracksByAlbumID
};