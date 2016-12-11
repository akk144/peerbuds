var mongoose = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  postId: { type: Number,ref : 'Post'},
  postHistoryTypeId: { type: Number,ref : 'Post'},
  revisionGUID :{type : String},
  userId: { type: Number},
  text: { type: String},
  comment: { type: String},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('PostHistory', schema);
