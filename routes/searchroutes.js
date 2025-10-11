const express = require('express');
const search = express.Router();
const searchcontroller = require('../controllers/searchcontroller');

search.post('/search_results',searchcontroller.searchdata);

module.exports = search;