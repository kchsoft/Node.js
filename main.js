var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');


function templateHTML(title,list,body,control){
  return `<!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        ${control}
        ${body}
      </body>
      </html>`;

}

function templateList(filelist){
  var list ='<ul>';
        var i = 0;
         while(i < filelist.length){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`
        i += 1;
      }
      list = list + '</ul>';
      return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url,true).query; 
    var pathname = url.parse(_url,true).pathname;

  if(pathname === '/') { // pathname이 루트라면 === '/' 즉, path가 없는 경로로 왔다면
    if(queryData.id === undefined){
        fs.readdir('./data',function(error,filelist){
          //``는 템플릿, ${}는(QueryString) 템플릿 안에서 변수처럼 사용할 수 있게 해준다.
          var title = "WelCome";
          var description = "Hello, Node.js";
          var list = templateList(filelist);
          var template = templateHTML(title,list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
          ); 
          response.writeHead(200);
          response.end(template); // template를 전송한다.
        });
      }
    else{//if (queryData.id != undefined)
      fs.readdir('./data',function(error,filelist){          
        fs.readFile(`data/${queryData.id}`,'utf8',function(err,description){
          var title = queryData.id;
          var list = templateList(filelist);
          var template = templateHTML(title,list,
            `<h2>${title}</h2>${description}`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
            ); 
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  } 
  else if( pathname === '/create'){
    fs.readdir('./data',function(error,filelist){
      var title = "Web - create";
      var description = "Hello, Node.js";
      var list = templateList(filelist);
      var template = templateHTML(title,list,`
        <form action="/create_process" method="post">
        <p> <input type="text" name="title" placeholder="title"> </p>
        <p> <textarea name="description" placeholder="description"></textarea> </p>
        <p> <input type="submit"> </p>
        </form>`,''
      ); 

      response.writeHead(200);
      response.end(template); // template를 전송한다.
    });
  }
  else if(pathname === '/create_process'){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        fs.writeFile(`data/${title}`, description, 'utf8', function(err){
          response.writeHead(302, {Location: `/?id=${title}`});
          response.end();
        });
    });
  }
  else if(pathname === '/update'){
    fs.readdir('./data', function(error, filelist){
      fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){
        var title = queryData.id;
        var list = templateList(filelist);
        var template = templateHTML(title, list,
          `
          <form action="/update_process" method="post">
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <p>
              <input type="submit">
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        response.end(template);
      });
    });
  }
 else if(pathname === '/update_process'){
    var body = '';
    request.on('data', function(data){
        body = body + data;
    });
    request.on('end', function(){
        var post = qs.parse(body);
        var id = post.id;
        var title = post.title;
        var description = post.description;
        fs.rename(`data/${id}`, `data/${title}`, function(error){
          fs.writeFile(`data/${title}`, description, 'utf8', function(err){
            response.writeHead(302, {Location: `/?id=${title}`});
            response.end();
          });
        });
    });
  }
  else{
    response.writeHead(404); // 파일을 찾을수 없는 약속된 404
    response.end('Not found');
  }
});
app.listen(3000); // 서버의 포트를 3000으로 맞춰준다.