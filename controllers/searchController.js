// controllers/searchController.js

const searchService = require('../services/searchService');


const searchTracks = async (req, res) => {
  try {
    const { query } = req.query;
    const result = await searchService.searchTracks(query);
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracks' });
  }
}

module.exports = { searchTracks };
