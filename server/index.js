// vanilla node server
const http = require('http');

// arrow function: 
const server = http.createServer((req, res) => {
    res.end('Hello World\n');
});

server.listen(4242, () => {                 // listens to specified port (4242) http://localhost:4242/ is web address
    console.log('Server is running...');
});