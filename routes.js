var handlers = require('./handlers/');

module.exports = function(app) {
  app.get('/', handlers.home);
  // app.get('/route1', handlers.handler1);
  // app.get('/route2', handlers.handler2);
  // app.get('/route3', handlers.handler3);
}