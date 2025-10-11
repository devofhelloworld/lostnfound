const found_data = require("../models/managefound");

exports.searchdata = (req,res,next)=>{
  const {keyword,category} = req.body;

  found_data.getsearchdata(keyword,category).then((alldata)=>{
    const results = alldata.filter((datas)=>{
      const key = datas.itemname.toLowerCase();
      const match = keyword.toLowerCase();
      return key.includes(match);
    });
    
    if(results.length==0){
      res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:''});
    }
    else{
      res.render('searchresults',{founddata:results,pagetitle:'Search Results',show:'hidden'});
    }
  })
}