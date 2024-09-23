const express = require('express');
const router = express.Router();
const artistController = require('../controllers/artistController');
const {validateEmail, validateUUID} = require('../middleware/validations');


router.post('/getid', artistController.getIDFromArtistName)
router.post('/', validateEmail, artistController.createArtist);
router.get('/:id', validateUUID, artistController.getArtist);
router.delete('/:id', validateUUID, artistController.deleteArtist);


module.exports = router;
