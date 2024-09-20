const express = require('express');
const router = express.Router();
const albumController = require('../controllers/albumController');
const {validateEmail, validateUUID} = require('../middleware/validations');



router.post('/', albumController.createAlbum);
router.get('/:albumID', validateUUID, albumController.getAlbum);
router.delete('/:albumID', validateUUID, albumController.deleteAlbum);
// router.post('/release_date', albumController.updateAlbumByReleaseDate);

module.exports = router;
