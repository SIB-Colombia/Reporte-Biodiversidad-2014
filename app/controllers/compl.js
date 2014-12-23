var fs = require('fs');

exports.getCompl = function(req, res) {
  var idficha = req.params._id;
  var docFicha = db_cards().filter({id_ficha: idficha}).first();
  if(docFicha.complemento===undefined||docFicha.complemento===null||docFicha.complemento===''){
  	res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  }else{

  	var tempFile=docFicha.complemento;
  	/*
  	fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  	});
	*/
	res.redirect(tempFile);
  }
  /*
  var tempFile="/home/oscarduque/Downloads/Presentacion_general_SiB_COLOMBIA.pdf";
  fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
*/
};

