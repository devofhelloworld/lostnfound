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
