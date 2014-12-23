exports.getImage = function(req, res){
  var idmap = req.params._id;
  var docMap = db_maps().filter({id_mapa: idmap}).first();

  var ids= new Array();
  db_maps().each(function (record,recordnumber) {
    ids.push(record["id_mapa"]);
  }); 
  
  if(docMap.titulo_mapa===undefined||docMap.titulo_mapa===null){
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
    var numMap=db_maps().count();

    var image={}

    if(db_maps().count()==1){
      image.prev="mapas/"+docMap.id_mapa;
      image.next="mapas/"+docMap.id_mapa;
    }else if(docMap.num ==1){
      image.prev="mapas/"+ids[numMap-1];
      image.next="mapas/"+ids[1];
    }else if(docMap.num==numMap){
      image.prev="mapas/"+ids[numMap-2];
      image.next="mapas/"+ids[0];
    }else{
      image.prev="mapas/"+ids[docMap.num-2];
      image.next="mapas/"+ids[docMap.num];
    }
    image.titulo=docMap.titulo_mapa;
    image.texto=docMap.texto_mapa;
    image.imagen_visualizador=docMap.imagen_visualizador;
    res.render('photoblog',{image:image});
  }
};