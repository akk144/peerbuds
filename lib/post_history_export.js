var mongoose = require('mongoose');
var fs = require('fs');
var PostHistory = require('../models/post_history');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./PostHistory.xml');
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
  //console.log(json.posthistory.row.length);
  for (var i = 0; i < json.posthistory.row.length; i++) {
      var newPostHistory = new PostHistory({
        id: json.posthistory.row[i].Id,
        postId : json.posthistory.row[i].PostId,
        postHistoryTypeId : json.posthistory.row[i].PostHistoryTypeId,
        revisionGUID : json.posthistory.row[i].RevisionGUID,
        createdAt : json.posthistory.row[i].CreationDate,
        updatedAt : json.posthistory.row[i].CreationDate
      });
      if(json.posthistory.row[i].UserId) {
        newPostHistory.userId = json.posthistory.row[i].UserId;
      }
      if(json.posthistory.row[i].Text) {
        newPostHistory.text = json.posthistory.row[i].Text;
      }
      if(json.posthistory.row[i].Comment) {
        newPostHistory.comment = json.posthistory.row[i].Comment;
      }
      newPostHistory.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
