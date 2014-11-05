// App clusters are a simple single-server form of scaling out where you create
// an independent server for each core (CPU).  This maximizes performance of
// a given server and is a low overhead way to test under parallel conditions
//
// The cluster module allows you to create child processes that share server
// ports.  Allows node (single-threaded) processes, to run on multiple cores
//
// These worker processes are spawned using child_process.fork method
// so they can communicate with parent via interprocess communication
// and pass server handles back and forth
var cluster = require('cluster');

// Create a worker process
function startWorker() {
  var worker = cluster.fork();

  console.log('CLUSTER: Worker %d started', worker.id);
}

if(cluster.isMaster) {
  // If cluster is master process, spawn a cluster for each core
  require('os').cpus().forEach(function() {
    startWorker();
  });

  // Log workers that disconnect.  Exit is triggered after disconnect
  cluster.on('disconnect', function(worker) {
    console.log(
      'CLUSTER: Worker %d disconnected from the cluster',
      worker.id
    );
  });

  // Spawn a new worker in its place
  cluster.on('exit', function(worker, code, signal) {
    console.log(
      'CLUSTER: Worker %d died with exit code %d (%s)',
      worker.id, code, signal
    );

    startWorker();
  });
} else {
  // When calling server.listen in a worker, it serializes the arguments
  // (port, callback) and passes request to the master process.  If master
  // has a listening server matching worker's requirements, then it passes
  // handle to worker, otherwise it will create one and pass handle to worker
  require('./app')();
}