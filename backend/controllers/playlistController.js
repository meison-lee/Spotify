// controllers/searchController.js

const playlistService = require('../services/playlistService');
const userService = require('../services/userService');


const getPlaylists = async (req, res) => {
  try {
    const { username } = req.params;

    console.log("from params username: ", username);
    const {userid} = await userService.getIDFromUsername(username);
    console.log("userID: ", userid);
    const result = await playlistService.getPlaylists(userid);

    console.log(result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

const getPlaylist = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const result = await playlistService.getPlaylist(playlistID);
    console.log("get playlist ",result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

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


const deletePlaylist = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const result = await playlistService.deletePlaylist(playlistID);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete playlist' });
  }
}


const getTracks = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const result = await playlistService.getTracks(playlistID);
    console.log("result ", result);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

const addTrack = async (req, res) => {
  try {
    const { playlistID } = req.params;
    const { trackID } = req.body;
    const result = await playlistService.addTrack(playlistID, trackID);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add tracks' });
  }
}

const removeTrack = async (req, res) => {
  try {
    const { playlistID, trackID } = req.params;

    const result = await playlistService.removeTracks(playlistID, trackID);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to remove tracks' });
  }
}

module.exports = { createPlaylist, getPlaylists, getTracks, getPlaylist, addTrack, removeTrack, deletePlaylist };
