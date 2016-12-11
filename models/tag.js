var mongoose   = require('mongoose');
var schema = mongoose.Schema({
  id : { type: Number,required: true,unique : true, default: 0},
  tagName: {type: String,trim : true,required : true},
  excerptPostId: {type: Number},
  count : {type: Number},
  wikiPostId : {type: Number},
  createdAt: { type: Date,  default: Date.now},
  updatedAt: { type: Date, default: Date.now }
});

schema.pre('save',function(next) {
    this.updatedAt = new Date();
    next();
});


module.exports = mongoose.model('Tag', schema);
