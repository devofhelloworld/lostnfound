const lost_data = require("../models/managelost");

exports.savelost = (req,res,next)=>{
  console.log(req.body);
   const {itemName,category,description,itemPhoto,location,specificLocation,dateLost,timeLost,firstName,lastName,email,phone,userId,additionalNotes,terms} = req.body;

  const lostitem = new lost_data(itemName,category,description,itemPhoto,location,specificLocation,dateLost,timeLost,firstName,lastName,email,phone,userId,additionalNotes,terms);
  
  lostitem.save().then(()=>{
    console.log('Lost item added successfully!');
  });

  res.redirect('/lost_items');
}

exports.lostlist = (req,res,next)=>{

  lost_data.fetchdetails().then( (lostdata) =>  {
    res.render('lostitems',{lostdata:lostdata, pagetitle:'Lost Items'});
  });
}

exports.getitemdetails = (req,res,next)=>{
  const itemid = req.params.itemid;
  console.log(itemid);
  lost_data.findbyid(itemid).then((itemdata)=>{   
    if(!itemdata){
      res.redirect('/lost_items');
    }
    else{
    res.render('lostitemdetails',{itemdata: itemdata,pagetitle:'Lost Item Details'});
    }
    
  });
  
}