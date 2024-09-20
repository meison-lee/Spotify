// db.js
require('dotenv').config();
const { Pool } = require('pg');

// Create a new pool instance for connection pooling
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Function to query the database
const query = (text, params) => {
  return pool.query(text, params);
};

// Export the query function for use in other modules
module.exports = {
  query,
};
