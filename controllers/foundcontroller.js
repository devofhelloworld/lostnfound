const found = require("../models/managefound");
const user = require("../models/user");
const claim = require('../models/manageclaims');
const { uploadToCloudinary } = require('../utils/cloudinaryutil');
const mongoose = require('mongoose');

exports.savefound = async (req,res,next)=>{
  try {
    let imglink = '';
    if (req.file) {
      imglink = await uploadToCloudinary(req.file.buffer);
    }
    const {itemname,category,ddes,fname,lname,phone,roll,currentlocation,addnote,terms} = req.body;
    const useremail = req.session.useremail || '';

    const founditem = new found({itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms,useremail});

    await founditem.save();
    console.log('Item added successfully');
    res.redirect('/found_items');
  } catch (error) {
    console.error('Error adding found item:', error);
    next(error);
  }
}

exports.foundlist = async (req, res, next) => {
  try {
    const [allFound, allClaims] = await Promise.all([
      found.find().sort({ _id: -1 }),
      claim.find({}, 'refid')       // only fetch the refid field
    ]);

    // Build a Set of claimed IDs so we can filter in O(1)
    const claimedIds = new Set(
      allClaims
        .filter(c => mongoose.Types.ObjectId.isValid(c.refid.toString()))
        .map(c => c.refid.toString())
    );

    const founddata = allFound.filter(item => !claimedIds.has(item._id.toString()));

    res.render('founditems', { founddata, pagetitle: 'Found Items', isloggedin: req.session.isloggedin });
  } catch (err) {
    next(err);
  }
};


exports.founditemdetails = (req, res, next) => {
  const itemid = req.params.itemid;

  // Guard: invalid ObjectId in URL → redirect cleanly
  if (!mongoose.Types.ObjectId.isValid(itemid)) {
    console.warn(`[founditemdetails] Invalid itemid param: "${itemid}" — redirecting.`);
    return res.redirect('/found_items');
  }

  const claims = req.query.claim === 'true';
  const claimed = req.query.claimed == 'true';
  const currentUserEmail = req.session.useremail || '';

  found.findById(itemid).then((itemdata) => {
    if (!itemdata) return res.redirect('/found_items');

    // True if the logged-in user is the one who reported this item
    const isOwnItem = itemdata.useremail && itemdata.useremail === currentUserEmail;

    if (claims == true) {
      claim.find({ refid: itemid }).then(([claimd]) => {
        user.find({ email: claimd.useremail }).then(([userdata]) => {
          if (claimed != true) {
            res.render('founditemdetails', { itemdata, pagetitle: 'Requested item details', disable: 'hidden', title: 'Claim', claimed: 'hidden', isloggedin: req.session.isloggedin, userdata, isOwnItem });
          } else {
            res.render('founditemdetails', { itemdata, pagetitle: 'Requested item details', disable: 'hidden', title: 'Claim', claimed: '', isloggedin: req.session.isloggedin, userdata, isOwnItem });
          }
        });
      });
    } else {
      res.render('founditemdetails', { itemdata, pagetitle: 'Found item details', disable: '', title: 'Found', claimed: 'hidden', isloggedin: req.session.isloggedin, userdata: null, isOwnItem });
    }
  }).catch(next);
};
