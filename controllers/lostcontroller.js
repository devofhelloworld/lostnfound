const lost = require("../models/managelost");

exports.savelost = (req,res,next)=>{
  console.log(req.body);
   const {itemname,category,ddes,imglink,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms} = req.body;

  const lostitem = new lost({itemname,category,ddes,imglink,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms});
  
  lostitem.save().then(()=>{
    console.log('Lost item added successfully!');
    res.redirect('/lost_items');
  });

  
}

exports.lostlist = (req,res,next)=>{

  lost.find().sort({_id:-1}).then( (lostdata) =>  {
    res.render('lostitems',{lostdata:lostdata, pagetitle:'Lost Items',isloggedin: req.session.isloggedin});
  });
}

exports.findByIddetails = (req,res,next)=>{
  const itemid = req.params.itemid;
  console.log(itemid);
  lost.findById(itemid).then((itemdata)=>{   
    if(!itemdata){
      res.redirect('/lost_items');
    }
    else{
    res.render('lostitemdetails',{itemdata: itemdata,pagetitle:'Lost Item Details',isloggedin: req.session.isloggedin});
    }
    
  });
  
}