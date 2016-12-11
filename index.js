var express = require('express');
var app = express();
var config = require('./config')(express, app);

app.use(function (req, res, next) {
  var request_body = JSON.stringify(req.body).substring(0,1000);
  console.log('%s %s: %s', req.method, req.url,request_body);
  next();
});

require('./routes/api')(app);

app.set('view engine', 'ejs');
app.use(function errorHandler(err, req, res, next) {
  console.log(err.stack);
  console.error('errOnReq: on request %d %s %s: %j', process.domain.id, req.method, req.url, err);
  if(err.status === 400) {
    return res.send(400).json({err: err})
  }
  res.status(500).json({err: err});
});

app.listen(config.port, function () {
  console.log('Server started on port: %s', config.port);
});