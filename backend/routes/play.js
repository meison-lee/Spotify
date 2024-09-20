const express = require('express');
const router = express.Router();
// const playController = require('../controllers/playController');

// Play endpoint
router.get('/:trackId', playController.playTrack);

module.exports = router;
