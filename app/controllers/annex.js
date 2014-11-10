

exports.getAnnex = function(req, res) {
  var urlannex = req.params._id;
  if(urlannex=='glosario'){
  	res.render('glossary_report', { title: 'Glosario' });
  }else if(urlannex=='autores'){
  	res.render('authors_report', { title: 'Índice de autores' });
  }else if(urlannex=='colaboradores'){
    res.render('helpers_report', { title: 'Índice de colaboradores' });
  }else if(urlannex=='temas'){
    res.render('topics_report', { title: 'Índice temático' });
  }else if(urlannex=='acronimos'){
    res.render('topics_report', { title: 'Acrónimos' });
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

