const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const {validateUsernameEmail, validateUUID} = require('../middleware/validations');

// get user's playlists
router.get('/user/:username', playlistController.getPlaylists);
// create a playlist
router.post('/', playlistController.createPlaylist);
// delete a playlist
router.delete('/:playlistID', playlistController.deletePlaylist);

// get tracks from a playlist
router.get('/:playlistID', playlistController.getTracks);
// add tracks to a playlist
router.post('/:playlistID', playlistController.addTrack);
// remove a track from a playlist
router.delete('/:playlistID/:trackID', playlistController.removeTrack);

module.exports = router;
