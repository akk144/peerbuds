var mongoose   = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  postId: {type: Number},
  voteTypeId: {type: Number, required: true, trim: true,lowercase: true},
  userId : {type: Number},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('Vote', schema);
