const express = require('express');
const router = express.Router();
const trackController = require('../controllers/trackController');


// create track
router.post('/', trackController.createTrack);
// get specific track
// router.get('/:trackID', trackController.getTrack);
// get all tracks
router.get('/', trackController.getAllTracks);
// delete specific track
// router.delete('/:trackID', trackController.deletetrack);


module.exports = router;
