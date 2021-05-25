'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
const spawn = require('child_process').spawn;
const authenticator = require('./security/authenticator.js').authenticate;
const socket_controller = require('./controllers/socket_controller');
const PORT = process.env.PORT;
const SOCKET_PORT = process.env.SOCKET_PORT;
const net = require('net');


const image_route = require('./routes/image_router.js');
const auth_route = require('./routes/sec_router.js');

// configure certs
const options = {
  key: fs.readFileSync('./certs/priv_k.pem'),
  cert: fs.readFileSync('./certs/server.pem')
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
  console.log(req.body);
  console.log(req.method);
    next();
});
*/
// configure routing
app.use('/image', authenticator, image_route);
app.use('/auth_pipeline', auth_route);

// configure https server
const https_server = https.createServer(options, app);


const socket_server = net.createServer({allowHalfOpen: true});

https_server.on('connection', (socket) => {
  socket.setEncoding('utf-8');
  console.log('receiving connection!');

  socket.on('data', (data) => {
    if(data.length > 5){
      try{
        socket_controller.handleIncomingSocketData(data)

      }catch (err){
        console.log('error handling incoming socket data.');
        console.log('received data:');
        console.log(data.toString());
      }
    }
  })
})

https_server.listen(PORT, () => {
  console.log(`server listening on port ${PORT} ...`);
})

/*
socket_server.listen(SOCKET_PORT, () => {
  console.log('socket server listening.');
})
*/
