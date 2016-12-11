var mongoose = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  postId: { type: Number,ref : 'Post'},
  relatedPostId :{type : Number,ref : 'Post'},
  linkTypeId: { type: Number},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('PostLinks', schema);
