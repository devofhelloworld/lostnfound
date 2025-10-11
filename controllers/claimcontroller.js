const claim_dataf = require('../models/manageclaims');
const found_data = require('../models/managefound');

exports.claimdetails = (req,res,next) =>{
  claim_dataf.fetchdetails().then( (founddata) => {
    res.render('claimrequest',{founddata:founddata,pagetitle:'Claim Requests'});
  }
  )
  
}

exports.addtoclaimitems = (req,res,next) =>{
  const claimid = req.params.claimid;
  console.log(claimid);
  found_data.getitem(claimid).then((data)=>{
    console.log(data);
    claim_dataf.findexistence(claimid).then((gotdata)=>{
      console.log(gotdata);
      if(gotdata){
        console.log('Already marked for claim');
        res.redirect(`/found_items/${gotdata._id}?claim=true&claimed=true`);
        // return res.status(400).json({ message: 'Already marked for claim by someone!' });
      }
      else{
        let {itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms,_id} = data;
        console.log(itemname);
        const claimitem = new claim_dataf(itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms,_id);
        claimitem.save();
        res.redirect('/claimrequests'); 
      }
    })
    
  })
}