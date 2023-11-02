const path = require('path');
const express = require('express');
const app = express();
const productController = require('./controllers/products');

const PORT = 3000;

app
    .use('/', express.static(path.join(__dirname, '../client/dist')))
    .use(express.json())

    .use('api/v1/products', productController)



    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    });


console.log('1: Trying to start server...');

app.listen(PORT, () => {
    console.log(`2: Server is running at http://localhost:${PORT}`);
});

console.log('3: End of file, waiting for requests...');

/*
// vanilla node server
const http = require('http');

// arrow function: 
const server = http.createServer((req, res) => {
    res.end('Hello World\n');
});

server.listen(4242, () => {                 // listens to specified port (4242) http://localhost:4242/ is web address
    console.log('Server is running...');
});
*/