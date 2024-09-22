// controllers/userController.js

const userService = require('../services/userService');

// Controller function to handle the route
const getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);  // Return the users data in response
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ error: 'Failed to fetch users' });  // Handle the error
  }
};

const createUser = async (req, res) => {
  try {
    const { username, email } = req.body;
    const result = await userService.createUser(username, email);
    res.status(201).send('User created');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await userService.deleteUser(id);
    res.status(200).send('User deleted');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

const checkUser = async (req, res) => {
  try {

    console.log("in check user route")
    console.log(req.body)
    const {username} = req.body;
    const result = await userService.checkUser(username);
    res.status(201).send({success:true, msg:"User exist"});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}

module.exports = { getUsers, createUser, deleteUser, checkUser };
