const http = require('http'); //The first line creates a variable called http, then assigns to the HTTP module. This is what imports the HTTP module and allows you to use the createServer() function.

http.createServer((request, response) => {
  response.writeHead(200, {'Content-Type': 'text/plain'});
  response.end('Hello Node!\n');
}).listen(8080);

console.log('My first Node test server is running on Port 8080.');

// const http = require('http'), //importing http module
//   fs = require('fs'),
//   url = require('url'); //importing url module

http.createServer((request, response) => {
  let addr = request.url,
    q = url.parse(addr, true), //parse the request.url to determine if the URL contains the word “documentation” - line 27
    filePath = '';

  fs.appendFile('log.txt', 'URL: ' + addr + '\nTimestamp: ' + new Date() + '\n\n', (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Added to log.');
    }
  });

  if (q.pathname.includes('documentation')) { 
    filePath = (__dirname + '/documentation.html');
  } else {
    filePath = 'index.html';
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      throw err;
    }

    response.writeHead(200, { 'Content-Type': 'text/html' });
    response.write(data);
    response.end();

  });

}).listen(8080);
console.log('My test server is running on Port 8080.');