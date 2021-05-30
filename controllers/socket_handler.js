'use strict'

const socket_controller = require('./socket_controller');

const socket_handler = (socket) => {

  socket.on('data', (data) => {
    if(data.length > 5){
      try{
        socket_controller.handleIncomingSocketData(socket, data);
      }catch (err){
        console.log('error handling incoming socket data.');
        console.log(err);
        console.log('received data:');
        console.log(data.toString());
      }
    }
  })

  socket.on('drain', () => {
    console.log('socket buffer cleared again, resuming wrinting data..');
    socket.resume()
  });

  socket.on('end', () => {
    try{
      console.log('client disconnected.');
    }catch (err){
      console.log('error on socket client disconnection.');
    }
  })

  socket.on('error', (err) => {
    console.log('error handling incoming socket connection');
    console.log('error msg:');
    console.log(err);
  })

  socket.on('close', () =>{
    console.log('client socket closed.');
  })
}

module.exports = {
  socket_handler,
}
