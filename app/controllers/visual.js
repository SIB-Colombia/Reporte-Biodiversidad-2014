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

    if(db_cards().count()==1){
      docFicha.prev=docFicha.id_ficha;
      docFicha.next=docFicha.id_ficha;
    }else if(docFicha.num ==1){
      docFicha.prev=ids[numCar-1];
      docFicha.next=ids[1];
    }else if(docFicha.num==numCar){
      docFicha.prev=ids[numCar-2];
      docFicha.next=ids[0];
    }else{
      docFicha.prev=ids[docFicha.num-2];
      docFicha.next=ids[docFicha.num];
    }
    res.render('photoblog',{image:docFicha});
    
  }
};