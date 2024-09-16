const express = require('express');
const router = express.Router();
const {getUsers, createUser, deleteUser } = require('../model/userModel');
const db = require('../db');


// Create a user
//
router.post('/', async (req, res) => {
  try{
    const { username, email } = req.body;
    const result = await createUser(username, email);
    res.send('User created');
  }
  catch(err){
    console.log("user.js create user route", err)
    res.status(500).send('Internal Server Error');
  }
})

// Get all users
//
router.get('/', async (req, res) => {
  try{
    const result = await getUsers()
    res.send(result)
  }
  catch(err){
    console.log("user.js get all users route", err)
    res.status(500).send('Internal Server Error');
  }
})

// Delete a user
//
router.delete('/:id', async (req, res) => {
  try{
    const id = req.params.id;
    const result = await deleteUser(id);
    res.send('User deleted');
  }
  catch(err){
    console.log("user.js delete user route", err)
    res.status(500).send('Internal Server Error');
  }
})

module.exports = router;
