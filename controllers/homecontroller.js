const found = require("../models/managefound");
const user = require("../models/user");
const lost = require('../models/managelost');
const claim = require('../models/manageclaims');
const mongoose = require('mongoose');

exports.foundform = (req,res,next)=>{
  user.find({email:req.session.useremail}).then(([userdata])=>{
    res.render('foundform',{pagetitle: 'Report Found Items',type:'Found',isloggedin: req.session.isloggedin ,userdata:userdata});
  })
}

exports.homepage = async (req,res,next)=>{
  try {
    const founddata_all = await found.find().sort({_id:-1});
    const lostdata = await lost.find().sort({_id:-1});
    const claims = await claim.find().sort({_id:-1});

    // Only keep refids that are valid ObjectIds — corrupted entries are skipped
    const validClaims = claims.filter(data => mongoose.Types.ObjectId.isValid(data.refid.toString()));
    const invalidCount = claims.length - validClaims.length;
    if (invalidCount > 0) {
      console.warn(`[homepage] Skipped ${invalidCount} claim(s) with invalid refid values.`);
    }

    // Build a Set of claimed found-item IDs for fast lookup
    const claimedIds = new Set(validClaims.map(c => c.refid.toString()));

    // Exclude claimed items from the "Found Items" feed
    const founddata = founddata_all.filter(item => !claimedIds.has(item._id.toString()));

    // Fetch the actual found-item documents for the claims section
    const claimdata = await Promise.all(
      validClaims.map(data => found.findById(data.refid))
    );

    res.render('home', {
      pagetitle: 'Lost & Found NIT Patna',
      isloggedin: req.session.isloggedin,
      founddata,
      lostdata,
      claimdata: claimdata.filter(Boolean),
      // Stats
      statItemsFound:   founddata_all.length,                       // all found items ever reported
      statReunited:     validClaims.length,                         // items successfully claimed
      statPending:      founddata_all.length - validClaims.length,  // unclaimed, still available
      claimsCount:      validClaims.length
    });
  } catch (err) {
    console.error('[homepage] Error loading home page:', err);
    next(err);
  }
};

exports.stats = async (req, res, next) => {
  try {
    const [totalFound, pendingClaims] = await Promise.all([
      found.countDocuments(),
      claim.countDocuments()
    ]);
    res.json({
      itemsFound:    totalFound,                  // all found items reported
      itemsReunited: pendingClaims,               // items that have been claimed/reunited
      pendingClaims: totalFound - pendingClaims   // items still available on found page
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};

exports.lostform = (req,res,next)=>{
  user.find({email:req.session.useremail}).then(([userdata])=>{
  res.render('lostform',{pagetitle:'Report Lost Items',type:'Lost',isloggedin: req.session.isloggedin,userdata:userdata});
  });
}
