var express = require('express')
  , fs = require('fs');

var app = express();

module.exports = function(parent, options){

  // allow specifying the view engine
  app.set('view engine', 'jade');
  app.set('views', __dirname + '/../app/views/');

  var index=require('./../app/controllers/index');
  var chapter=require('./../app/controllers/chapter');
  var card=require('./../app/controllers/card');
  var visual=require('./../app/controllers/visual');
  var info=require('./../app/controllers/info');
  var annex=require('./../app/controllers/annex');
  var compl=require('./../app/controllers/compl');
  var summary=require('./../app/controllers/summary');
  var maps=require('./../app/controllers/maps');

  app.get('/biodiversidad2014/',index.index);
  app.get('/biodiversidad2014/capitulo/:_id',chapter.getChapter);
  app.get('/biodiversidad2014/ficha/:_id',card.getCard);
  app.get('/biodiversidad2014/visualizador/:_id',visual.getImage);
  app.get('/biodiversidad2014/:_id',info.info);
  app.get('/biodiversidad2014/apendices/:_id',annex.getAnnex);
  app.get('/biodiversidad2014/complemento/:_id',compl.getCompl);
  app.get('/biodiversidad2014/resumen/:_id',summary.getImage);
  app.get('/biodiversidad2014/mapas/:_id',maps.getImage);

  app.use(function(req, res, next){
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }

    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  });

  // Internal server error
  app.use(
    function(err, req, res) {
      res.status(500); 
      return res.send('500');
  });


/*
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}
*/


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

    // mount the app
  parent.use(app);
};