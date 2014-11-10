var fs = require('fs');

exports.getCompl = function(req, res) {
  var tempFile="/home/oscarduque/Downloads/Presentacion_general_SiB_COLOMBIA.pdf";
  fs.readFile(tempFile, function (err,data){
     res.contentType("application/pdf");
     res.send(data);
  });
};

