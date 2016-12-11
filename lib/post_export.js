var mongoose = require('mongoose');
var fs = require('fs');
var Post = require('../models/post');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Posts.xml');
var mongoUrl = 'mongodb://127.0.0.1/peerbuds_dev';
mongoose.connect(mongoUrl);
//mongoose.set('debug', true);
mongoose.connection.on('connected', function(){
  console.log('Connected to MongoDB at: %s ', mongoUrl);
  dump();
});

mongoose.connection.on('error',function (err) {
  console.log('Mongoose default connection error: ' + err);
});

require('../models');
var dump = function() {
  var json = parser.toJson(xml);
  json = JSON.parse(json);
  //console.log(json.posts.row.length);
  for (var i = 0; i < json.posts.row.length; i++) {
      var newPost = new Post({
        id: json.posts.row[i].Id,
        postTypeId : json.posts.row[i].PostTypeId,
        score : json.posts.row[i].Score,
        body : json.posts.row[i].Body,
        title : json.posts.row[i].Title,
        lastActivityDate : json.posts.row[i].LastActivityDate,
        ownerUserId : json.posts.row[i].OwnerUserId,
        tags : json.posts.row[i].Tags,
        createdAt : json.posts.row[i].CreationDate,
        updatedAt : json.posts.row[i].CreationDate
      });
      if(json.posts.row[i].LastEditorUserId) {
        newPost.lastEditorUserId = json.posts.row[i].LastEditorUserId;
      }
      if(json.posts.row[i].LastAccessDate) {
        newPost.lastAccessDate = json.posts.row[i].LastAccessDate;
      }
      if(json.posts.row[i].AcceptedAnswerId) {
        newPost.acceptedAnswerId = json.posts.row[i].AcceptedAnswerId;
      }
      if(json.posts.row[i].ViewCount) {
        newPost.viewCount = json.posts.row[i].ViewCount;
      }
      if(json.posts.row[i].FavoriteCount) {
        newPost.favoriteCount = json.posts.row[i].FavoriteCount;
      }
      if(json.posts.row[i].AnswerCount) {
        newPost.answerCount = json.posts.row[i].AnswerCount;
      }
      if(json.posts.row[i].CommentCount) {
        newPost.commentCount = json.posts.row[i].CommentCount;
      }
      if(json.posts.row[i].ParentId) {
        newPost.parentId = json.posts.row[i].ParentId;
      }
      newPost.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
