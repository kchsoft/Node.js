var http = require('http');
var fs = require('fs');
var url = require('url');


var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; 
    var pathname = url.parse(_url,true).pathname;
 

  if(pathname === '/') // pathname이 루트라면 === '/' 즉, path가 없는 경로로 왔다면
  {
    if(queryData.id === undefined){
        fs.readdir('./data',function(error,filelist){
          //``는 템플릿, ${}는(QueryString) 템플릿 안에서 변수처럼 사용할 수 있게 해준다.
        var title = "WelCome";
        var description = "Hello, Node.js";

        var list ='<ul>';
        var i = 0;
         while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i += 1;
      }
      list = list + '</ul>';

      var template = `<!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>`;

      response.writeHead(200);
      response.end(template); // template를 전송한다.
        })
      }
      else{
          fs.readdir('./data',function(error,filelist){
            //``는 템플릿, ${}는(QueryString) 템플릿 안에서 변수처럼 사용할 수 있게 해준다.
          var title = "WelCome";
          var description = "Hello, Node.js";

          var list ='<ul>';
          var i = 0;
          while(i < filelist.length){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
            i += 1;
          }
          list = list + '</ul>';


          fs.readFile(`data/${queryData.id}`,'utf-8',function(err,description){
            //``는 템플릿, ${}는(QueryString) 템플릿 안에서 변수처럼 사용할 수 있게 해준다.
            var title = queryData.id;
            var template = `<!doctype html>
            <html>
            <head>
              <title>WEB1 - ${title}</title>
              <meta charset="utf-8">
            </head>
            <body>
              <h1><a href="/">WEB</a></h1>
              ${list}
              <h2>${title}</h2>
              <p>${description}</p>
            </body>
            </html>`;
            
          response.writeHead(200);
          response.end(template); // template를 전송한다.
        });
      });
    }
  }
  else{
    response.writeHead(404); // 파일을 찾을수 없는 약속된 404
    response.end('Not found');
  }
   
 
});
app.listen(3000); // 서버의 포트를 3000으로 맞춰준다.