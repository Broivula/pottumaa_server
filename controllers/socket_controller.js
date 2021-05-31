'use strict'

const database = require('../database/database.js');

var cam_client = null
var phone_client = null
const clients = {
  0: null,
  1: null
}

const sendDataToClient = (client, data) => {
  const stringifiedMsg = JSON.stringify(data.msg);
  clients[client].write(`${data}\n`) ? console.log('data sent successfully') : client.socket.pause();
};

// cam = 1, phone = 0
const assign_client = (socket, client) => {
  // set the socket timeout here to 0
  socket.setTimeout(0);
  client == 1 ? clients[1] = socket : clients[0] = socket;
}

const handleIncomingSocketData = (socket, data) => {
  try{
    const parsedData = JSON.parse(data.toString());   
    assign_client(socket,parsedData.device);
  }catch(err){
    console.log('err handling incoming socket data. err msg: ');
    console.log(err);
  }
};

module.exports = {
  sendDataToClient,
  handleIncomingSocketData
}
