const fs = require('fs');
const path = require('path');
const db = require('./db');  // Your database connection

const initializeDatabase = async () => {
  try {
    // Load the SQL file
    const schema = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');

    // Execute the schema
    await db.query(schema);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing the database:', error);
  }
};

initializeDatabase();
