const {getdb} = require('../utils/databaseutil');
const { ObjectId } = require('mongodb');


module.exports = class claim_dataf{
  constructor(itemname,category,ddes,imglink,fname,lname,phone,roll,currentlocation,addnote,terms,_id){
    this.itemname = itemname;
    this.category = category;
    this.ddes = ddes;
    this.imglink = imglink;
    this.fname = fname;
    this.lname = lname;
    this.phone = phone;
    this.roll = roll;
    this.currentlocation = currentlocation;
    this.addnote = addnote;
    this.terms = terms;
    if(_id)this._id = _id;
  }

  save(){
    const db = getdb();
    return db.collection('claims').insertOne(this);
  }
  static fetchdetails(){
    const db = getdb();
    return db.collection('claims').find().toArray();
  }
  static findexistence(id){
    const db = getdb();
    return db.collection('claims').find({_id: new ObjectId(String(id))}).next();
  }
}