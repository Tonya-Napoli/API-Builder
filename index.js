
require('dotenv').config();
const server = require('./api/server.js');


const express = require('express');

const port = process.env.PORT || 9000;

server.use(express.json());

server.get('/hello', (req, res) => {
  res.json('hello, there');
});

server.listen(port, '0.0.0.0', () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});
