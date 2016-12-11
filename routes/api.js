var postController = require('../controllers/post');
var userController = require('../controllers/user');
var controller = require('../controllers/index');
module.exports = function(app) {
  app.get('/', controller.dashboard);
  app.get('/posts', postController.index);
  app.get('/users', userController.index);
};
