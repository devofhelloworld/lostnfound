const { ObjectId } = require('mongodb');
const {getdb} = require('../utils/databaseutil');

module.exports = class lost_data{
  constructor(itemname,category,ddes,imglink,llocation,sfloc,lostdate,losttime,fname,lname,email,phone,roll,addnote,terms,_id){
    this.itemname = itemname;
    this.category = category;
    this.ddes = ddes;
    this.imglink = imglink;
    this.llocation = llocation;
    this.sfloc = sfloc;
    this.lostdate = lostdate;
    this.losttime = losttime;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.phone = phone;
    this.roll = roll;
    this.addnote = addnote;
    this.terms = terms;
    if(_id)this._id = _id;
  }

  save(){
    const db = getdb();
    return db.collection('lost').insertOne(this);
  }

  static fetchdetails(){
    const db = getdb();
    return db.collection('lost').find().toArray();
  }

  static findbyid(id){
    const db = getdb();
    return db.collection('lost').find({_id:new ObjectId(String(id))}).next();
  }
}