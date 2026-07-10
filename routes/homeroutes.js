const express = require('express');
const home = express.Router();
const homecontroller = require('../controllers/homecontroller');
const foundcontroller = require('../controllers/foundcontroller');

home.get('/',homecontroller.homepage);
home.get('/found_form',homecontroller.foundform);
home.get('/lost_form',homecontroller.lostform);
home.get('/api/stats',homecontroller.stats);

module.exports = home;
