var express = require('express')
  , path = require('path')
  , request = require('request')
  , TAFFY = require('taffydb').taffy
  , csv = require("csv-streamify")
  , cronJob = require('cron').CronJob
  , morgan = require('morgan') 
  , bodyParser = require('body-parser')
  , methodOverride = require('method-override')
  , favicon = require('serve-favicon') //***
  , winston = require('winston');

module.exports = function(parent) {
	parent.set('port', process.env.PORT || appConfigVars.port);
	parent.set('view engine', 'jade');
	parent.set('jsonp callback', true );
	//parent.use(express.compress());
	parent.use(favicon(__dirname + '/public/sib.ico' ));
	parent.use(bodyParser.urlencoded());
	parent.use(bodyParser.json());
	parent.use(methodOverride());
	parent.use(require('stylus').middleware(__dirname + '/../../public'));

	var env = process.env.NODE_ENV || 'development';

	// Load configuration according to environment
	console.log("Current node environment:");
	console.log(process.env.NODE_ENV);
	if(process.env.NODE_ENV == 'development') {
		require('./development')(parent);
	} else if(process.env.NODE_ENV == 'production') {
		require('./production')(parent);
	} else {
		require('./development')(parent);
	}

	// load controllers
	require('./../routers')(parent, { verbose: true });

	db_chapters = TAFFY();
	db_cards = TAFFY();
	db_cont = TAFFY();

	var logger = morgan('combined');

	
	// Load datai of images from google spreadsheet
	//logger.info("Initial load of image data.");  //Error no method info
	console.log("Initial load of image data.");
	db_chapters().remove();
	db_cards().remove();
	db_cont().remove();
	var parser = csv({objectMode: true, columns: true});
	var parserCard = csv({objectMode: true, columns: true});
	var parserCont = csv({objectMode: true, columns: true});
	var counter = 1;
	var counterCa = 1;
	var counterCont = 1;
	parser.on('readable', function () {
		var line = parser.read()
		if(line.titulo_capitulo) {
			line.num = counter;
			db_chapters.insert(line);
			counter++;
		}
	});

	parserCard.on('readable', function () {
		var lineCa = parserCard.read();
		if(lineCa.titulo_ficha) {
			lineCa.num = counterCa;
			db_cards.insert(lineCa);
			counterCa++;
		}
	});

	parserCont.on('readable', function () {
		var lineCont = parserCont.read();
		if(lineCont.titulo_contenido) {
			lineCont.num = counterCont;
			db_cont.insert(lineCont);
			counterCont++;
		}
	});


	request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=0").pipe(parser);
	request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=468483010").pipe(parserCard);
	request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=2040957954").pipe(parserCont);
	//logger.info("Done initial load of image data.");

	
	var job = new cronJob({
		cronTime: '0 0 * * * *',
		onTick: function() {
			// Load datai of images from google spreadsheet
			//logger.info("Loading image data.");
			db_chapters().remove();
			db_cards().remove();
			db_cont().remove();
			var parser = csv({objectMode: true, columns: true});
			var parserCard = csv({objectMode: true, columns: true});
			var parserCont = csv({objectMode: true, columns: true});
			var counter = 1;
			var counterCa = 1;
			var counterCont = 1;
			parser.on('readable', function () {
				var line = parser.read()
				if(line.titulo_capitulo) {
					line.num = counter;
					db_chapters.insert(line);
					counter++;
				}
			});

			parserCard.on('readable', function () {
			var lineCa = parserCard.read();
				if(lineCa.titulo_ficha) {
					lineCa.num = counterCa;
					db_cards.insert(lineCa);
					counterCa++;
				}
			});

			parserCont.on('readable', function () {
			var lineCont = parserCont.read();
				if(lineCont.titulo_contenido) {
					lineCont.num = counterCont;
					db_cont.insert(lineCont);
					counterCont++;
				}
			});


			request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=0").pipe(parser);
			request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=468483010").pipe(parserCard);
			request("https://docs.google.com/spreadsheets/d/17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE/export?format=csv&id=17Pr8wcP_jhdtKJ40LIxrrqkgZwR8-7srx0R_JO_QJZE&gid=2040957954").pipe(parserCont);
			//logger.info("Done loading image data.");
			console.log("Done loading image data.");
		},
		start: false,
		timeZone: "America/Bogota"
	});
	job.start();

	/*
	logger.info("Image blog sib initial configuration loaded.");
	*/
};