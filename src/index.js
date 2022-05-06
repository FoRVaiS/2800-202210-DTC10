const http = require('http');

const config = require('config');

const { createServer } = require('./server');

const server = http.createServer(createServer());

const address = config.get('server.address');
const port = config.get('server.port');

server.listen(port, address, err => {
  if (err) return console.error(err);

  const { address, port } = server.address();

  console.log(`Server is bound to ${address}:${port}`);
});
