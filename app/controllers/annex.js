var fs = require('fs');

exports.getAnnex = function(req, res) {
  var urlannex = req.params._id;
  console.log("La dirección: "+urlannex);
  if(urlannex=='autores'){
  	res.render('authors_report', { title: 'Índice de autores' });
  }else if(urlannex=='colaboradores'){
    res.render('helpers_report', { title: 'Índice de colaboradores' });
  }else if(urlannex=='acronimos'){
    res.render('topics_report', { title: 'Acrónimos' });
  }else if(urlannex=='literatura'){
    res.render('biblio_report', { title: 'Literatura citada' });
  }else if(urlannex=='mapas'){
    res.render('maps_report', { title: 'Mapas' });
  }else if(urlannex=='afiche'){
    //temporal, mientras se sube la imagen o pdf
    var tempFile="/home/oscarduque/Downloads/Presentacion_general_SiB_COLOMBIA.pdf";
    fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
    });
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

