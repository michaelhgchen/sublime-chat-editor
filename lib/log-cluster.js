module.exports = function(req, res, next) {
  var cluster = require('cluster');

  if(cluster.isWorker) {
    console.log('Worker %d recieved request', cluster.worker.id);
  }

  next();
}