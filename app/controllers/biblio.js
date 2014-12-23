exports.getBiblio= function(req, res) {
  var urlficha = req.params._id;
  logger.info("Id card: "+urlficha);
  var docFicha = db_cards().filter({id_ficha: urlficha}).first();

  if(docFicha.titulo_ficha===undefined||docFicha.titulo_ficha===null){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  }else{
    var id_fich=docFicha.id_ficha;

    res.redirect(docFicha.literatura_link);
  }
};
