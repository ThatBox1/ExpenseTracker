const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/user');

//Register
Router.post('/register', UserController.RegisterUser);

//Login
Router.post('/login', UserController.LoginUser);

//Get users
Router.get('/', UserController.GetUsers);



module.exports = Router;