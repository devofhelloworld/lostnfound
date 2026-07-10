const found = require("../models/managefound");
const user = require("../models/user");
const claim = require('../models/manageclaims');

exports.savefound = (req,res,next)=>{
  console.log(req.body);
   const {itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms} = req.body;

  const founditem = new found({itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms});

  founditem.save().then(()=>{
    console.log('Item added successfully');
    res.redirect('/found_items');
  });

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
