const express = require('express');
const found = express.Router();
const foundcontroller = require('../controllers/foundcontroller');

found.post('/submit-found-item',foundcontroller.savefound);
found.get('/found_items',foundcontroller.foundlist);
found.get('/found_items/:itemid',foundcontroller.founditemdetails);

module.exports = found;
