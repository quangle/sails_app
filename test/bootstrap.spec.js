var Sails = require('sails'), sails;

before(function(done) {
  this.timeout(10000);

  Sails.lift({
    port: 1336,
    environment: 'development',
    log: {
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, function(err, server) {
    sails = server;
    if (err) return done(err);
    done(err, sails);
  });
});

after(function(done) {
  Sails.lower(done);
});
