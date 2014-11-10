exports.getChapter= function(req, res) {
  
  var urlcap = req.params._id;
  var doc = db_chapters().filter({id_capitulo: urlcap}).first();

  if(doc.titulo_capitulo===undefined||doc.titulo_capitulo===null){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  }else{
    var cardTitle = new Array();
    var cardImage = new Array();
    var cardFicha = new Array();

    var id_cap=doc.id_capitulo;
    var cardArr=db_cards().filter({id_capitulo: id_cap}).get();

    db_cards().filter({id_capitulo: id_cap}).each(function (record,recordnumber) {
      cardTitle.push(record["titulo_ficha"]);
      cardImage.push(record["titulo_ficha"]);
      var card={}
      card.title=record["titulo_ficha"];
      card.image=record["imagen_ficha_s"];
      card.id_ficha=record["id_ficha"];
      cardFicha.push(card);

    });
    res.render('chapter_report', { capitulo: doc, fichas: cardFicha, title: doc.titulo_capitulo});
  }
};