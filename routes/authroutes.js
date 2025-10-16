const express = require('express');
const auth = express.Router();
const authcontroller = require('../controllers/authcontroller');

auth.get('/login',authcontroller.login);
auth.post('/login',authcontroller.postlogin);
auth.get('/logout',authcontroller.logout);
auth.get('/signup',authcontroller.signup);
auth.post('/signup',authcontroller.postsignup);

module.exports = auth;