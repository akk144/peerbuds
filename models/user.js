var mongoose = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  reputation: { type: Number,  default: 0},
  displayName: {type: String, required: true, trim: true,lowercase: true},
  location: {type: String,  required: false, trim: true },
  aboutMe: { type: String, trim: true},
  views: { type: Number},
  upvotes : {type : Number},
  downvotes : {type : Number},
  age : {type : Number},
  accountId : {type: Number },
  profileImageUrl: {type: String,  required: false, trim: true },
  websiteUrl: {type: String,  required: false, trim: true },
  lastAccessDate : {type : Date,default : Date.now},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('User', schema);
