const artistService = require('../services/artistService');

const createArtist = async (req, res) => {
  try {
    const { artist_name, email } = req.body;
    const result = await artistService.createArtist(artist_name, email);
    res.status(201).send('Artist created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const getArtist = async (req, res) => {
  try {
    const artistID = req.params.id;
    const result = await artistService.getArtist(artistID);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const getIDFromArtistName = async (req, res) => {
  try {
    const {artist_name} = req.body

    const result = await artistService.getIDFromArtistName(artist_name)
    res.status(200).send(result)
  }
  catch(err) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const deleteArtist = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await artistService.deleteArtist(id);
    res.status(200).send('Artist deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  getArtist,
  createArtist,
  deleteArtist,
  getIDFromArtistName
}

