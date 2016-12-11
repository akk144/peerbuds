var mongoose = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  name: {type: String, trim: true },
  date: { type: Date,  default: Date.now},
  class : {type : Number},
  userId : {type : Number},
  tagBased : {type : Boolean,default : false},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('Badge', schema);
