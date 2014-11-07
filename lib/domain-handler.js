var
  domain   = require('domain'),
  cluster  = require('cluster');

module.exports = function(server) {

return function(req, res, next) {
    var newDomain, killTimer, worker

    // Create a domain for this request
    newDomain = domain.create();

    // Handle errors that occur on this domain
    newDomain.on('error', function(err) {
      console.error('DOMAIN ERROR CAUGHT\n', err.stack);

      // We want to try to route user to the proper error page
      try {
        // Failsafe shutdown in 5 seconds
        killTimer = setTimeout(function() {
          process.exit(1);
        }, 5000);

        // If killTimer is only item left in event loop stop running program
        killTimer.unref();

        worker = cluster.worker;

        // Let master know this cluser is dead (trigger 'disconnect')
        if(worker) {
          worker.disconnect();
        }

        // Stop taking new requests
        server.close();

        // attempt Express error route with next
        try {
          next(err);

        // if failed, try plain node response
        } catch(err) {
          console.error('Express error routing failed.\n', err.stack);
          res.statusCode = 500;
          res.setHeader('content-type', 'text/plain');
          res.end('Server error.');
        }

        // if express and node both fail
      } catch(err) {
        console.error('Unable to send 500 response.\n', err.stack);
      }
    });

    // add request, response objects in domain
    newDomain.add(req);
    newDomain.add(res);

    // execute rest of chain in domain
    newDomain.run(next);
  }
}
