const express = require('express');
const lost = express.Router();
const lostcontroller = require('../controllers/lostcontroller');
const { upload } = require('../utils/cloudinaryutil');

lost.post('/submit-lost-item', upload.single('imglink'), lostcontroller.savelost);
lost.get('/lost_items',lostcontroller.lostlist);
lost.get('/lost_items/:itemid',lostcontroller.findByIddetails);
module.exports = lost;
