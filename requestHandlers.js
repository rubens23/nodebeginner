var querystring = require('querystring');
  fs = require('fs');
  formidable = require('formidable');

function start(res) {
  console.log("Request handler 'start' was called");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; ' +
    'charset=UTF-8" />'+
    '<head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(body);
    res.end();
}

function upload(res, req) {
  console.log("Request handler 'upload' was called");

  var form = new formidable.IncomingForm();
  console.log('about to parse');
  form.parse(req, function(err, fields, files) {
    console.log('parsing done');
    fs.rename(files.upload.path, './IMG_2734.PNG', function(err) {
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.upload.path, './IMG_2734.PNG');
      }
    });
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write('recieved image:<br/>');
  res.write("<img src = '/show' />")
  res.end();
});
}

function show(res) {
  console.log("Request handler 'show' was called");
  res.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(res);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
