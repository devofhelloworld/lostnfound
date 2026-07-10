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
