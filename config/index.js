'use strict';

require('dotenv').config({silent: true});
require('./mongoose');


var fs = require('fs');

var bodyParser = require('body-parser');
var morgan = require('morgan');
var session      = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);

var db = {
  dev: 'mongodb://127.0.0.1/peerbuds_dev'
}

exports.db = db;

module.exports = function(express, app) {
  app.use(bodyParser.json({limit: '5mb'}));
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use(require('express-domain-middleware'));

  var store = new MongoDBStore(
    {
      uri: 'mongodb://127.0.0.1/peerbuds_dev',
      collection: 'mySessions'
    });

  // Catch errors
  store.on('error', function(error) {
    if(error) throw error;
  });
  app.use(session({ secret: process.env.SESSION_SECRET, store: store, resave: false, saveUninitialized: false }));
  return {
    port: process.env.PORT || 3000,
    db: db
  }
}
