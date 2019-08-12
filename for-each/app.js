const {forEach, map} = require('./arrayutils.js');

const data = ['A', 'B', 'C', 'D', 'E'];

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const handleRequest = (request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain');
  let responseData = '';
  let modData = map(data, item => `${item}\n`);
  forEach(modData, item => responseData += `${item}`);
  response.end(responseData);
  console.log(`Request headers:\n${JSON.stringify(request.headers, null, 2)}\n`);
};

const server = http.createServer(handleRequest);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
