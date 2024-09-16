const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {validateUsernameEmail, validateUUID} = require('../middleware/validations');
const {body, validationResult} = require('express-validator');



router.post('/', validateUsernameEmail, userController.createUser);
router.get('/', userController.getUsers);
router.delete('/:id', validateUUID, userController.deleteUser);

module.exports = router;
