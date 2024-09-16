const express = require('express');
const router = express.Router();
// const playController = require('../controllers/playController');

// Play endpoint
// router.get('/:trackId', playController.playTrack);
router.get('/:trackId', (req,res) => {
  res.send(req.params.trackId)
});

module.exports = router;
