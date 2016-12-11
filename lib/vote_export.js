var mongoose = require('mongoose');
var fs = require('fs');
var Vote = require('../models/vote');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Votes.xml');
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
  //console.log(json.votes.row.length);
  for (var i = 0; i < json.votes.row.length; i++) {
      var newVote = new Vote({
        id: json.votes.row[i].Id,
        postId : json.votes.row[i].PostId,
        voteTypeId : json.votes.row[i].VoteTypeId,
        createdAt : json.votes.row[i].CreationDate,
        updatedAt : json.votes.row[i].CreationDate
      });
       if(json.votes.row[i].UserId) {
        newVote.userId = json.votes.row[i].UserId;
      }
      newVote.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
