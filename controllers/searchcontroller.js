const found = require("../models/managefound");

exports.searchdata = (req,res,next)=>{
  const {keyword,category} = req.body;
  console.log(category);
  if(category=='all'){
    found.find().then((alldata)=>{
      console.log(alldata);
      const results = alldata.filter((datas)=>{
        const key = datas.itemname.toLowerCase();
        const match = keyword.toLowerCase();
        return key.includes(match);
      });
      if(results.length==0){
        res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:'',isloggedin: req.session.isloggedin});
      }
      else{
        res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:'hidden',isloggedin: req.session.isloggedin});
      }
    });
  }
  else{found.find({category: category}).then((alldata)=>{
    console.log(alldata);
    const results = alldata.filter((datas)=>{
      const key = datas.itemname.toLowerCase();
      const match = keyword.toLowerCase();
      return key.includes(match);
    });

    if(results.length==0){
      res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:'',isloggedin: req.session.isloggedin});
    }
    else{
      res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:'hidden',isloggedin: req.session.isloggedin});
    }
  });}

}
