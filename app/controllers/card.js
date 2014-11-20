exports.getCard= function(req, res) {
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
    var contInfo = new Array();
    var id_fich=docFicha.id_ficha;

    db_cont().filter({id_ficha: id_fich}).each(function (record,recordnumber) {
      var cont={}
      cont.title=record["titulo_contenido"];
      cont.text=record["texto_contenido"];
      cont.url=record["url"];
      contInfo.push(cont);
    });

  res.render('card_report', { ficha: docFicha, contInfo: contInfo, title: docFicha.titulo_ficha });
  }
};
