const found_data = require("../models/managefound");

exports.savefound = (req,res,next)=>{
  console.log(req.body);
   const {itemName,category,description,itemPhoto,firstName,lastName,phone,userId,currentLocation,additionalNotes,terms} = req.body;

  const founditem = new found_data(itemName,category,description,itemPhoto,firstName,lastName,phone,userId,currentLocation,additionalNotes,terms);
  
  founditem.save().then(()=>{
    console.log('Item added successfully');
  });

  res.redirect('/found_items');
}

exports.foundlist = (req,res,next)=>{
   found_data.fetchdetails().then((founddata)=>{
    res.render('founditems',{ founddata:founddata ,pagetitle:'Found Items'});
   })
   
}

exports.founditemdetails = (req,res,next)=>{
  const itemid = req.params.itemid;
  const claim = req.query.claim === 'true';
  const claimed = req.query.claimed == 'true';

  found_data.getitem(itemid).then((itemdata)=>{
    if(claim == true){
      if(claimed!=true){
        !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Found item details',disable: 'hidden',title:'Claim',claimed:'hidden'});}
      
      else{
        !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Found item details',disable: 'hidden',title:'Claim',claimed:''});
      }
  }
    else  { !itemdata?res.redirect('/found_items'): res.render('founditemdetails',{itemdata:itemdata,pagetitle:'Found item details',disable:'',title:'Found',claimed:'hidden'});}
  })
}