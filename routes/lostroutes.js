const express = require('express');
const lost = express.Router();
const lostcontroller = require('../controllers/lostcontroller');

lost.post('/submit-lost-item',lostcontroller.savelost);
lost.get('/lost_items',lostcontroller.lostlist);
lost.get('/lost_items/:itemid',lostcontroller.findByIddetails);
module.exports = lost;