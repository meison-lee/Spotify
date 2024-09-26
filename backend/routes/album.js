const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const {validateEmail, validateUUID} = require('../middleware/validations');

// create album
router.post('/', albumController.createAlbum);
// get all albums
router.get('/', albumController.getAllAlbums);
// get specific album
router.get('/:albumID', albumController.getAlbum);
router.delete('/:albumID', albumController.deleteAlbum);

module.exports = router;
