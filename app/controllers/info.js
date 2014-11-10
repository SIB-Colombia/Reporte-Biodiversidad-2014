

exports.info = function(req, res) {
  var urlinfo = req.params._id;
  if(urlinfo=='presentacion'){
  	res.render('intro_report', { title: 'Presentación' });
  }else if(urlinfo=='resumen'){
  	res.render('summary_report', { title: 'Resumen Ejécutivo' });
  }else {
  	res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  }
};

