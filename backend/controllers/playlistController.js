// controllers/searchController.js

const playlistService = require('../services/playlistService');
const userService = require('../services/userService');


const createPlaylist = async (req, res) => {
  try {
    const { username, playlist_name } = req.body;
    const userID = await userService.getIDFromUsername(username);
    console.log("userID: ", userID);
    const result = await playlistService.createPlaylist(userID, playlist_name);
    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

const getPlaylist = async (req, res) => {
  try {
    const { username } = req.params;

    console.log("from params username: ", username);
    const userID = await userService.getIDFromUsername(username);
    console.log("userID: ", userID);
    const result = await playlistService.getPlaylist(userID);

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

module.exports = { createPlaylist, getPlaylist };
