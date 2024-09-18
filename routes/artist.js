const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const {validateEmail, validateUUID} = require('../middleware/validations');



router.post('/', validateEmail, artistController.createArtist);
router.get('/:id', validateUUID, artistController.getArtist);
router.delete('/:id', validateUUID, artistController.deleteArtist);
// router.post('/:id/albums', validateUUID, artistController.createAlbum);
// router.get('/:id/albums', validateUUID, artistController.getAlbums);

module.exports = router;
