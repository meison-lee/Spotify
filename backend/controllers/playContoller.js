const playService = require('../services/playService');

const playTtack = async (req, res) => {
  try {
    const trackId = req.params.trackId;
    const result = await playService.playTrack(trackId);
    res.status(200).send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = {
  playTtack
}