const express = require('express');
const claimrequestrouter = express.Router();
const claimcontroller = require('../controllers/claimcontroller');

claimrequestrouter.get('/claimrequests',claimcontroller.claimdetails);
claimrequestrouter.post('/claimrequests/:claimid',claimcontroller.addtoclaimitems)

module.exports = claimrequestrouter;