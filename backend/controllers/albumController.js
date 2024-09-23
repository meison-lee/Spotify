const albumService = require('../services/albumService');
const trackService = require('../services/trackService');
const artistService = require('../services/artistService');

const createAlbum = async (req, res) => {
  try {

    const { artist_name, album_name, release_date, tracks } = req.body;

    const artistID = await artistService.getIDFromArtistName(artist_name)

    console.log("in create album get artist id",artistID)

    const result = await albumService.createAlbum(artistID, album_name, release_date);

    const albumid = result.albumid

    for (let track of tracks) {
      const { track_name, track_length } = track;
      const result = await trackService.createTrack(track_name, track_length, albumid, artistID)

      // console.log(result);
    }

    res.status(201).send({msg:'Album created'});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const getAlbum = async (req, res) => {
  try {
    const albumID = req.params.albumID;
    const result = await albumService.getAlbum(albumID);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const deleteAlbum = async (req, res) => {
  try {
    const albumID = req.params.albumID;
    const result = await albumService.deleteArtist(albumID);
    res.status(200).send('Artist deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}


module.exports = {
  createAlbum,
  getAlbum,
  deleteAlbum,
};