const found_data = require("../models/managefound");

exports.foundform = (req,res,next)=>{
  res.render('foundform',{pagetitle: 'Report Found Items',type:'Found' });
}

exports.homepage = (req,res,next)=>{
  res.render('home',{pagetitle:'Lost & Found NIT Patna'});
  
}

exports.lostform = (req,res,next)=>{
  res.render('lostform',{pagetitle:'Report Lost Items',type:'Lost'});
}

