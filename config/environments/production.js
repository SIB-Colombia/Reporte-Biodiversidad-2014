var express = require('express')
  , path = require('path')
  , winston = require('winston');

module.exports = function(parent) {
	parent.use(function(req, res, next){
		res.setHeader('Cache-Control', 'public, max-age=2592000000'); // 4 days
		res.setHeader('Expires', new Date(Date.now() + 345600000).toUTCString());
		next();
	});
	parent.use(express.static(path.join(__dirname, '/../../public')));
	
	logger = new (winston.Logger)({
		transports: [
			new (winston.transports.Console)({ level: 'error' }),
			new (winston.transports.File)({ filename: 'logs/image_blog.log' })
		]
	});
};