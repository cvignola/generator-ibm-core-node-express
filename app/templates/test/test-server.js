var expect = require('chai').expect;
var http = require('http');

// Below code demonstrates using various methods of testing
describe('Testing Server', function() {

  before(function(done){
    require(process.cwd() + '/server/server');
    setTimeout(done, 1000); // Waiting 1 second for server to start
  });

  it('Public endpoint returns "Hello!"', function(done){
    var responseString = '';

    var options = {
      host: 'localhost',
      port: process.env.PORT || 8080,
      path: '/'
    };

    var callback = function(response){
      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        expect(responseString).to.equal('Hello!');
        done();
      });
    }

    http.request(options, callback).end();
  });

  it('Health endpoint shows status up', function(done){
    var responseString = '';

    var options = {
      host: 'localhost',
      port: process.env.PORT || 8080,
      path: '/health'
    };

    var callback = function(response){
      response.on('data', function (chunk) {
        responseString += chunk;
      });

      response.on('end', function () {
        expect(responseString).to.equal('{"status":"UP"}');
        done();
      });
    }

    http.request(options, callback).end();
  });
});
