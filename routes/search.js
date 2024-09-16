const express = require('express');
const router = express.Router();
const {getUsers } = require('../services/userService');
const db = require('../db');
// const searchController = require('../controllers/searchController');

// Search endpoint
// router.get('/', searchController.searchTracks);
router.get('/', async (req, res) => {

  // Query the database
  const result = await getUsers()
  res.send(result);
})

module.exports = router;
