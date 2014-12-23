exports.getImage = function(req, res){
  var idficha = req.params._id;
  var docFicha = db_cards().filter({id_ficha: idficha}).first();

  var ids= new Array();
  db_cards().each(function (record,recordnumber) {
    ids.push(record["id_ficha"]);
  }); 
  
  if(docFicha.titulo_ficha===undefined||docFicha.titulo_ficha===null){
    res.status(404);
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  }else{
    var numCar=db_cards().count();
    var image={}

    if(db_cards().count()==1){
      image.prev="visualizador/"+docFicha.id_ficha;
      image.next="visualizador/"+docFicha.id_ficha;
    }else if(docFicha.num ==1){
      image.prev="visualizador/"+ids[numCar-1];
      image.next="visualizador/"+ids[1];
    }else if(docFicha.num==numCar){
      image.prev="visualizador/"+ids[numCar-2];
      image.next="visualizador/"+ids[0];
    }else{      image.prev="visualizador/"+ids[docFicha.num-2];
      image.next="visualizador/"+ids[docFicha.num];
    }
    image.titulo=docFicha.titulo_ficha;
    image.texto=docFicha.texto_ficha;
    image.imagen_visualizador=docFicha.imagen_visualizador.trim();
    res.render('photoblog',{image:image});
    
  }
};