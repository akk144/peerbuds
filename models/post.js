var mongoose = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  postTypeId: { type: Number,  default: 0},
  parentId :{type : Number},
  acceptedAnswerId: {type: String, trim: true,lowercase: true},
  title: {type: String, trim: true },
  body: { type: String, trim: true},
  score: { type: Number},
  viewCount : {type : Number},
  lastEditorUserId : {type: Number},
  ownerUserId : {type: Number},
  answerCount : {type : Number},
  commentCount : {type : Number},
  favouriteCount : {type : Number},
  lastActivityDate : {type : Date,default : Date.now},
  tags : { type: String},
  lastEditDate : {type : Date,default : Date.now},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('Post', schema);
