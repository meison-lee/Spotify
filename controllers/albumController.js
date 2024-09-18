const albumService = require('../services/albumService');

const createAlbum = async (req, res) => {
  try {

    const { artist_name, album_name, release_date } = req.body;
    const result = await albumService.createAlbum(artist_name, album_name, release_date);
    res.status(201).send({msg:'Album created', result});
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