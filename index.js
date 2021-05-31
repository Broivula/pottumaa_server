'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const spawn = require('child_process').spawn;
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const tls = require('tls');

const authenticator = require('./security/authenticator.js').authenticate;
const socket_handler = require('./controllers/socket_handler').socket_handler;
const image_route = require('./routes/image_router.js');
const auth_route = require('./routes/sec_router.js');
const test_route = require('./routes/test_route.js');

// configure certs
const options = {
  key: fs.readFileSync('./certs/server.key'),
  cert: fs.readFileSync('./certs/server.cert')
};

// configure parsing
app.use(express.json({strict:true, limit:'50mb'}));
app.use(express.urlencoded({extended: true, limit:'50mb'}));

/*
app.use(function(req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    console.log("here we are bois");
  console.log(req.client.url);
  console.log(req.method);
    next();
});
*/

// configure routing
app.use('/image', authenticator, image_route);
app.use('/test', test_route);
app.use('/auth_pipeline', auth_route);

// configure https server
const https_server = https.createServer(options, app);

options.allowHalfOpen = true;
const socket_server = tls.createServer(options, socket_handler);


https_server.listen(PORT, () => {
  console.log(`server listening on port ${PORT} ...`);
})
/*
https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(SOCKET_PORT);
*/
socket_server.listen(SOCKET_PORT, () => {
 console.log('socket server started, listening on port ' + SOCKET_PORT);
});

