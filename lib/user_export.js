var mongoose = require('mongoose');
var fs = require('fs');
var User = require('../models/user');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Users.xml');
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
  //console.log(json.users.row.length);
  for (var i = 0; i < json.users.row.length; i++) {
      var newUser = new User({
        id: json.users.row[i].Id,
        repuation : json.users.row[i].Repuation,
        displayName : json.users.row[i].DisplayName,
        location : json.users.row[i].Location,
        aboutMe : json.users.row[i].AboutMe,
        views : json.users.row[i].Views,
        upvotes : json.users.row[i].Upvotes,
        downVotes : json.users.row[i].DownVotes,
        lastAccessDate : json.users.row[i].LastAccessDate,
        createdAt : json.users.row[i].CreationDate,
        updatedAt : json.users.row[i].CreationDate
      });
      if(json.users.row[i].Age) {
        newUser.age = json.users.row[i].Age;
      }
      if(json.users.row[i].AccountId) {
        newUser.accountId = json.users.row[i].AccountId;
      }
      if(json.users.row[i].WebsiteUrl) {
        newUser.websiteUrl = json.users.row[i].WebsiteUrl;
      }
      if(json.users.row[i].ProfileImageUrl) {
        newUser.pofileImageUrl = json.users.row[i].ProfileImageUrl;
      }
      newUser.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
