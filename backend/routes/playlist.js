const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController');
const {validateUsernameEmail, validateUUID} = require('../middleware/validations');


router.get('/:username', playlistController.getPlaylist);
router.post('/', playlistController.createPlaylist);

module.exports = router;
