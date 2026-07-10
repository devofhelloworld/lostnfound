const found = require("../models/managefound");
const user = require("../models/user");
const lost = require('../models/managelost');
const claim = require('../models/manageclaims');

exports.foundform = (req,res,next)=>{
  user.find({email:req.session.useremail}).then(([userdata])=>{
    res.render('foundform',{pagetitle: 'Report Found Items',type:'Found',isloggedin: req.session.isloggedin ,userdata:userdata});
  })

}

exports.homepage = async (req,res,next)=>{
  const founddata = await found.find().sort({_id:-1});
  const lostdata = await lost.find().sort({_id:-1});
  const claims = await claim.find().sort({_id:-1});
  const claimids = claims.map(data=>data.refid.toString());

  const claimdata = await Promise.all(
    claimids.map(id => found.findById(id))
  );

  console.log(claimdata);
  res.render('home',{pagetitle:'Lost & Found NIT Patna',isloggedin:req.session.isloggedin,founddata,lostdata,claimdata});
  }
  ;

exports.lostform = (req,res,next)=>{
  user.find({email:req.session.useremail}).then(([userdata])=>{
  res.render('lostform',{pagetitle:'Report Lost Items',type:'Lost',isloggedin: req.session.isloggedin,userdata:userdata});
  });
}
