

exports.info = function(req, res) {
  var urlinfo = req.params._id;
  if(urlinfo=='presentacion'){
  	res.render('intro_report', { title: 'Información para la gestión integral de la Biodiversidad' });
  }else if(urlinfo=='prologo1'){
    res.render('prologue1_report', { title: 'Biodiversidad, factor de innovación y sostenibilidad' });
  }else if(urlinfo=='prologo2'){
    res.render('prologue2_report', { title: 'Biodiversidad Y Desarrollo: perspectiva global' });
  }else if(urlinfo=='resumen'){
  	res.render('summary_report', { title: 'Panorama de la Biodiversidad, un llamado a la acción' });
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

