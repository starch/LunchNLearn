var expect = require('Chai').expect;
var assert = require('assert');
var request = require('request');

describe('Status Page', function() {
	it('should return 200', function (done) {
	  var options = {
	    url: 'http://localhost:3000/status',
	    headers: {
	      'Content-Type': 'text/plain'
	    }
	  };
	  request.get(options, function (err, res, body) {
	    expect(res.statusCode).to.equal(200);
	    expect(res.body).to.equal('Hello World!');
	    done();
	  });
	});
});

describe('i-dont-exist Page', function() {
	it('should return 404', function (done) {
	  var options = {
	    url: 'http://localhost:3000/i-dont-exist',
	    headers: {
	      'Content-Type': 'text/plain'
	    }
	  };
	  request.get(options, function (err, res, body) {
	    expect(res.statusCode).to.equal(404);
	    done();
	  });
	});
});