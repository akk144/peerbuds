var mongoose = require('mongoose');
var fs = require('fs');
var Tag = require('../models/tag');
var utils = require('./utils');
var parser = require('xml2json');
var xml = fs.readFileSync('./Tags.xml');
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
  //console.log(json.tags.row.length);
  for (var i = 0; i < json.tags.row.length; i++) {
      var newTag = new Tag({
        id: json.tags.row[i].Id,
        tagName : json.tags.row[i].TagName,
        count : json.tags.row[i].Count,
      });
      if(json.tags.row[i].WikiPostId) {
        newTag.wikiPostId = json.tags.row[i].WikiPostId;
      }
      if(json.tags.row[i].ExcerptPostId) {
        newTag.excerptPostId = json.tags.row[i].ExcerptPostId;
      }
      newTag.save(function (err,question) {
        if(err) {  console.log(err); }
      });
  }
}
