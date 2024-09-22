const db = require('../db');


// Function to get all users
const getUsers = async () => {
  try{
    const query = "SELECT * FROM users";
    const result = await db.query(query);
    return result.rows;
  }
  catch(err){
    throw new Error(err);
  }
}

// Function to create a user
const createUser = async (username, email) => {
  try {
    const query = "INSERT INTO users (username, email) VALUES ($1, $2)";
    const values = [username, email];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch (err) {
    throw new Error(err);
  }
}

// Function to delete a user
const deleteUser = async (id) => {
  try {
    const query = "DELETE FROM users WHERE userID = $1";
    const values = [id];
    const result = await db.query(query, values);
    return result.rows;
  }
  catch (err) {
    throw new Error(err);
  }
}

const checkUser = async (username) => {
  try {
    const query = "SELECT userid FROM users WHERE username = $1"
    const values = [username]
    const result = await db.query(query, values)
    console.log(result.rows)
    return result.rows
  }
  catch (err) {
    throw new Error(err)
  }
}



module.exports = {
  getUsers,
  createUser,
  deleteUser,
  checkUser
};