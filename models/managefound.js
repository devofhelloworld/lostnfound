const mongoose = require('mongoose');

const foundSchema = mongoose.Schema({
  itemname:{type: String , required: true}
  ,category:{type: String , required: true}
  ,ddes:{type: String , required: true}
  ,imglink: String
  ,fname:{type: String , required: true}
  ,lname:{type: String , required: true}
  ,phone:{type: Number , required: true}
  ,roll:{type: Number , required: true}
  ,currentlocation:{type: String , required: true}
  ,addnote:String
  ,terms:{type: String , required: true}

})

module.exports = mongoose.model('found',foundSchema);

