var http = require('http');

var reqHandler = function (req, res) {
    res.write('Hello World! you are on page'+req.url); //write a response to the client
    res.end(); //end the response
  };

//create a server object:
var server = http.createServer(reqHandler);
server.listen(8080); //the server object listens on port 8080 


/*

// Or you can run everything in a single go like this:


//create a server object:
http.createServer(function (req, res) {
  res.write('Hello World!'); //write a response to the client
  res.end(); //end the response
}).listen(8080); //the server object listens on port 8080 
*/