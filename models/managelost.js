const mongoose = require('mongoose');

const lostSchema = mongoose.Schema({
  itemname:{type: String , required: true}
  ,category:{type: String , required: true}
  ,ddes:{type: String , required: true}
  ,imglink: String
  ,llocation:{type: String , required: true}
  ,sfloc:String
  ,lostdate:{type:String, required: true}
  ,losttime:String
  ,fname:{type: String , required: true}
  ,lname:{type: String , required: true}
  ,email:{type:String,required:true}
  ,phone:{type: Number , required: true}
  ,roll:Number
  ,addnote:String
  ,terms:{type: String , required: true}

})

module.exports= mongoose.model('lost',lostSchema);
