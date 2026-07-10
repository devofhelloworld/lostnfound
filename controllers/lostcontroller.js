const lost = require("../models/managelost");
const { uploadToCloudinary } = require('../utils/cloudinaryutil');
const mongoose = require('mongoose');

exports.savelost = async (req,res,next)=>{
  try {
    let imglink = '';
    if (req.file) {
      imglink = await uploadToCloudinary(req.file.buffer);
    }
    const {itemname,category,ddes,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms} = req.body;

    const lostitem = new lost({itemname,category,ddes,imglink,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms});

    await lostitem.save();
    console.log('Lost item added successfully!');
    res.redirect('/lost_items');
  } catch (error) {
    console.error('Error adding lost item:', error);
    next(error);
  }
}

exports.lostlist = (req,res,next)=>{

  lost.find().sort({_id:-1}).then( (lostdata) =>  {
    res.render('lostitems',{lostdata:lostdata, pagetitle:'Lost Items',isloggedin: req.session.isloggedin});
  });
}

exports.findByIddetails = (req, res, next) => {
  const itemid = req.params.itemid;

  if (!mongoose.Types.ObjectId.isValid(itemid)) {
    console.warn(`[findByIddetails] Invalid itemid param: "${itemid}" — redirecting.`);
    return res.redirect('/lost_items');
  }

  lost.findById(itemid).then((itemdata) => {
    if (!itemdata) {
      res.redirect('/lost_items');
    } else {
      res.render('lostitemdetails', { itemdata, pagetitle: 'Lost Item Details', isloggedin: req.session.isloggedin });
    }
  }).catch(next);
};
