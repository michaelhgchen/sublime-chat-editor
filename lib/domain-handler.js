var domain   = require('domain');

module.exports = function(server) {

return function(req, res, next) {
    var newDomain, killTimer;

    // Create a domain for this request
    newDomain = domain.create();

    // Handle errors that occur on this domain
    newDomain.on('error', function(err) {
      console.error('DOMAIN ERROR CAUGHT\n', err.stack);

      // Try to route user to the proper error page
      try {
        // Failsafe shutdown in 5 seconds
        killTimer = setTimeout(function() {
          process.exit(1);
        }, 5000);

        // If killTimer is only item left in event loop stop running program
        killTimer.unref();

        // Stop taking new requests
        server.close();

        // Attempt Express's error route with next
        try {
          next(err);

        // Attempt plain Node response
        } catch(err) {
          console.error('Express error routing failed.\n', err.stack);
          res.statusCode = 500;
          res.setHeader('content-type', 'text/plain');
          res.end('Server error.');
        }

        // If both Express and Node fail
      } catch(err) {
        console.error('Unable to send 500 response.\n', err.stack);
      }
    });

    // Add request, response objects in domain
    newDomain.add(req);
    newDomain.add(res);

    // Execute rest of chain in domain
    newDomain.run(next);
  }
}
