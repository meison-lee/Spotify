const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const {validateEmail, validateUUID} = require('../middleware/validations');

// create album
router.post('/', albumController.createAlbum);
// get all albums
router.get('/', albumController.getAllAlbums);
// get specific album
router.get('/:albumID', validateUUID, albumController.getAlbum);
router.delete('/:albumID', validateUUID, albumController.deleteAlbum);
// router.post('/release_date', albumController.updateAlbumByReleaseDate);

module.exports = router;
