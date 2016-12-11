var models = require('../models');
var utils = require('../lib/utils');
var _ = require('underscore');
var async = require('async');
module.exports = {
  index: function(req, res) {
    var tags = [];
    async.parallel([
      function getTags(callback) {
        models.Tag.find({})
        .select('-_id tagName')
        .sort({tagName : 1})
        .exec(function(err, doc){
          tags = doc;
          callback();
        });
      }
    ],function(err,result){
      var crit = {};
      if(req.query.searchByTitle) {
        crit.title = {$regex: new RegExp(req.query.searchByTitle,"gi")};
      }
      if(req.query.tag) {
        crit.tags = {$regex: new RegExp(req.query.tag,"gi")};
      }
      var limit = 10;
      var offset = parseInt(req.query.offset) || 0;
      var searchTitle = req.query.searchByTitle || '';
      var tag = req.query.tag || '';
      models.Post.find(crit,function(err, doc) {
        res.render('post/index.ejs', {
          posts: doc,
          tags : tags,
          searchTitle : searchTitle,
          tag : tag,
          offset : offset+limit
        })
      })
      .skip(offset)
      .limit(limit)
    });
  }
}
