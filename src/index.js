const http = require('http');

const { createServer } = require('./server');

const server = http.createServer(createServer());

server.listen(err => {
  if (err) return console.error(err);

  const { address, port } = server.address();

  console.log(`Server is bound to ${address}:${port}`);
});
