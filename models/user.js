const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  fname:{type:String,required:true},
  lname:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:Number,required:true},
  roll:{type:Number,required:true},
  terms:{type:String, required:true},
  password:{type:String, required:true}
})

module.exports = mongoose.model('user',userSchema);
