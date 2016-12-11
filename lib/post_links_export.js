var mongoose = require('mongoose');
var fs = require('fs');
var PostLink = require('../models/post_links');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./PostLinks.xml');
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
  //console.log(json.postlinks.row.length);
  for (var i = 0; i < json.postlinks.row.length; i++) {
      var newPostLink = new PostLink({
        id: json.postlinks.row[i].Id,
        postId : json.postlinks.row[i].PostId,
        relatedPostId : json.postlinks.row[i].RelatedPostId,
        linkTypeId : json.postlinks.row[i].linkTypeId,
        createdAt : json.postlinks.row[i].CreationDate,
        updatedAt : json.postlinks.row[i].CreationDate
      });
      newPostLink.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
