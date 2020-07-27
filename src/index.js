const path = require('path');

const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

const port = process.env.PORT || 3000;

server.listen(port, () => console.log(`Server listening on port ${port}`));