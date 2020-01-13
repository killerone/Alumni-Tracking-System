const http = require('http');
const app = require('./backend/app');

const port = process.env.PORT || 3000;

const server = http.createServer(app);
console.log("Server running at http://localhost:" + port);
server.listen(port);