const mongoose = require('mongoose');

const lostSchema = mongoose.Schema({
  itemname:{type: String , required: true}
  ,category:{type: String , required: true}
  ,ddes:{type: String , required: true}
  ,imglink: String
  ,llocation:{type: String , required: true}
  ,sfloc:String,
  lostdate:{type:String, required: true}
  ,losttime:{type:String , required: true}
  ,fname:{type: String , required: true}
  ,lname:{type: String , required: true}
  ,email:{type:String,required:true}
  ,phone:{type: Number , required: true}
  ,roll:{type: Number , required: true}
  ,addnote:String
  ,terms:{type: String , required: true}

})

module.exports= mongoose.model('lost',lostSchema);

// module.exports = class lost{
//   constructor(itemname,category,ddes,imglink,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms,_id){
//     this.itemname = itemname;
//     this.category = category;
//     this.ddes = ddes;
//     this.imglink = imglink;
//     this.llocation = llocation;
//     this.sfloc = sfloc;
//     this.lostdate = lostdate;
//     this.losttime = losttime;
//     this.fname = fname;
//     this.lname = lname;
//     this.email = email;
//     this.phone = phone;
//     this.roll = roll;
//     this.addnote = addnote;
//     this.terms = terms;
//     if(_id)this._id = _id;
//   }

//   save(){
//     const db = getdb();
//     return db.collection('lost').insertOne(this);
//   }

//   static find(){
//     const db = getdb();
//     return db.collection('lost').find().toArray();
//   }

//   static findbyid(id){
//     const db = getdb();
//     return db.collection('lost').find({_id:new ObjectId(String(id))}).next();
//   }
// }