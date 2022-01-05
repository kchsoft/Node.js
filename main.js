var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; 
    var title = queryData.id;
    console.log(queryData.id);
    if(_url == '/'){
      title = 'Welcome';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);

    fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){

       //``는 템플릿, ${}는 템플릿 안에서 변수처럼 사용할 수 있게 해준다.
      var template = `<!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        <ol>
          <li><a href="/?id=HTML">HTML</a></li>
          <li><a href="/?id=CSS">CSS</a></li>
          <li><a href="/?id=JavaScript">JavaScript</a></li>
        </ol>
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
      response.end(template); // template를 전송한다.
    })   
 
});
app.listen(3000); // 서버의 포트를 3000으로 맞춰준다.