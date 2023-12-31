const path = require('path');
const express = require('express');
require('dotenv').config();
const userController = require('./controllers/users');
const productController = require('./controllers/products');
const { parseAuthorizationToken, requireUser } = require('./middleware/authorization');
const app = express();

const PORT = process.env.PORT ?? 3000;

app
    .use('/', express.static(path.join(__dirname, '../client/dist/')))
    .use(express.json())

    // CORS
    .use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', '*');
        res.header('Access-Control-Allow-Headers', '*');
        if (req.method === 'OPTIONS') {
            return res.send(200);
        }
        next();
    })

    .use(parseAuthorizationToken)

    .use('/api/v1/products', requireUser(), productController)
    .use('/api/v1/users', userController)

    .get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'))
    });

app
    .use((err, req, res, next) => {
        console.error(err);
        res
            .status(err?.status || 500)
            .json({ message: err?.message || err });
    })



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