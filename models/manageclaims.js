const mongoose = require('mongoose');

const claimSchema = mongoose.Schema({
  refid:{type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'found',
        unique: true
      },
  useremail: {type:String,required:true}
})

module.exports = mongoose.model('claim',claimSchema);


// module.exports = class claim{
//   constructor(itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms,_id){
//     this.itemname = itemname;
//     this.category = category;
//     this.ddes = ddes;
//     this.imglink = imglink;
//     this.fname = fname;
//     this.lname = lname;
//     this.phone = phone;
//     this.roll = roll;
//     this.currentlocation = currentlocation;
//     this.addnote = addnote;
//     this.terms = terms;
//     if(_id)this._id = _id;
//   }

//   save(){
//     const db = getdb();
//     return db.collection('claims').insertOne(this);
//   }
//   static find(){
//     const db = getdb();
//     return db.collection('claims').find().toArray();
//   }
//   static findexistence(id){
//     const db = getdb();
//     return db.collection('claims').find({_id: new ObjectId(String(id))}).next();
//   }
// }