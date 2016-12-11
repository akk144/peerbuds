var mongoose = require('mongoose');
var fs = require('fs');
var Comment = require('../models/comment');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Comments.xml');
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
  //console.log(json.comments.row.length);
  for (var i = 0; i < json.comments.row.length; i++) {
      var newComment = new Comment({
        id: json.comments.row[i].Id,
        postId : json.comments.row[i].PostId,
        text : json.comments.row[i].Text,
        score : json.comments.row[i].Score,
        createdAt : json.comments.row[i].CreationDate,
        updatedAt : json.comments.row[i].CreationDate
      });
       if(json.comments.row[i].UserId) {
        newComment.userId = json.comments.row[i].UserId;
      }
      newComment.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
