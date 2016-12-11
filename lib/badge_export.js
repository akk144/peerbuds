var mongoose = require('mongoose');
var fs = require('fs');
var Badge = require('../models/badge');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Badges.xml');
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
  //console.log(json.badges.row.length);
  for (var i = 0; i < json.badges.row.length; i++) {
      var newBadge = new Badge({
        id: json.badges.row[i].Id,
        name : json.badges.row[i].Name,
        date : json.badges.row[i].Date,
        tagBased : json.badges.row[i].TagBased,
        class : json.badges.row[i].Class
      });
       if(json.badges.row[i].UserId) {
        newBadge.userId = json.badges.row[i].UserId;
      }
      newBadge.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
