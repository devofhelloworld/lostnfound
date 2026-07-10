const found = require("../models/managefound");
const user = require("../models/user");
const claim = require('../models/manageclaims');
const { uploadToCloudinary } = require('../utils/cloudinaryutil');

exports.savefound = async (req,res,next)=>{
  try {
    let imglink = '';
    if (req.file) {
      imglink = await uploadToCloudinary(req.file.buffer);
    }
    const {itemname,category,ddes,fname,lname,phone,roll,currentlocation,addnote,terms} = req.body;

    const founditem = new found({itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms});

    await founditem.save();
    console.log('Item added successfully');
    res.redirect('/found_items');
  } catch (error) {
    console.error('Error adding found item:', error);
    next(error);
  }
}

exports.foundlist = (req,res,next)=>{
   found.find().sort({_id:-1}).then((founddata)=>{
    res.render('founditems',{ founddata:founddata ,pagetitle:'Found Items',isloggedin: req.session.isloggedin});
   })

}

exports.founditemdetails = (req,res,next)=>{
  const itemid = req.params.itemid;
  const claims = req.query.claim === 'true';
  const claimed = req.query.claimed == 'true';

  found.findById(itemid).then((itemdata)=>{

      if(claims == true){
        claim.find({refid:itemid}).then(([claimd])=>{
         user.find({email:claimd.useremail}).then(([userdata])=>{

        if(claimed!=true){
          !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Requested item details',disable: 'hidden',title:'Claim',claimed:'hidden',isloggedin: req.session.isloggedin,userdata:userdata});}

        else{

          !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Requested item details',disable: 'hidden',title:'Claim',claimed:'',isloggedin: req.session.isloggedin,userdata:userdata});
        }
      })
     })
    }
      else  { !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Found item details',disable:'',title:'Found',claimed:'hidden',isloggedin: req.session.isloggedin,userdata:null});}

  })
}
