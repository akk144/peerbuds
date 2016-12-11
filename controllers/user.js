var models = require('../models');
var utils = require('../lib/utils');
var _ = require('underscore');
var async = require('async');
module.exports = {
  index: function(req, res) {
    var crit = {};
    if(req.query.searchByUserId) {
      crit.id = req.query.searchByUserId;
    }
    var searchUser = req.query.searchByUserId || '';
    var list = [];
    var limit = 50;
    var offset = parseInt(req.query.offset) || 0;
    models.User.find(crit,function(err, doc) {
      async.series([
        function getUsers(callback) {
        var find_criteria = {
          $or : [
            {ownerUserId : doc[0].id},
            {lastEditorUserId : doc[0].id}
          ]
        }
         models.Post.find(find_criteria).select('tags').exec(function(err,posts){
          posts.forEach(function(post) {
            if(post.tags) {
              var tagArray = post.tags.split('/<>/');
              tagArray.forEach(function(tag){
                var criteria = {};
                criteria.tags = {$regex: new RegExp(tag,"gi")};
                models.Post.find(criteria).select('ownerUserId lastEditorUserId').exec(function(err,users){
                  var postUserIds = _.pluck(users,'ownerUserId');
                  var editUserIds = _.pluck(users,'lastEditorUserId');
                  postUserIds.push.apply(postUserIds,editUserIds);
                  models.User.find({id : {$in : postUserIds}}).exec(function(err,usersDoc){
                    list.push.apply(list,usersDoc);
                  });
                })
              })
            } 
          });
          callback();
          })
        },
        function getUsersByLocation(callback) {
          models.User.find({location : doc.location})
          .exec(function(err, doc){
            list.push.apply(list,doc);
            callback();
          });
        },function getUsersByAge(callback) {
          models.User.find({age : doc.age})
          .exec(function(err, doc){
            list.push.apply(list,doc);
            callback();
          });
        }
      ],function(err,result) {
        list = list.slice(0,50);
        res.render('user/index.ejs', {
          users: list,
          searchUser : searchUser,
          offset : offset+limit
        })
      });
    })
      .skip(offset)
      .limit(limit);
  }
}
