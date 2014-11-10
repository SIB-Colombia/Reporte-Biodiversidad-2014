var express = require('express')
  , path = require('path')
  , winston = require('winston')
  , errorHandler = require('errorhandler');

module.exports = function(parent) {
	parent.use(errorHandler());
	parent.use(express.static(path.join(__dirname, '/../../public')));

	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)()
		]
	});
};