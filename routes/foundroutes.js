const express = require('express');
const found = express.Router();
const foundcontroller = require('../controllers/foundcontroller');
const { upload } = require('../utils/cloudinaryutil');

found.post('/submit-found-item', upload.single('imglink'), foundcontroller.savefound);
found.get('/found_items',foundcontroller.foundlist);
found.get('/found_items/:itemid',foundcontroller.founditemdetails);

module.exports = found;
