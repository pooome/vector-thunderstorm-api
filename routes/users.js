var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/users');

router.post('/register', UsersController.registerUser);

router.post('/login', UsersController.loginUser);

module.exports = router;
 