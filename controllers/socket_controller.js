'use strict'


const sendDataToClient = (client, data) => {
  const stringifiedMsg = JSON.stringify(data.msg);
  client.socket.write(`${data}\n`) ? console.log('data sent successfully') : client.socket.pause();
};

const handleIncomingSocketData = (socket, data) => {
  const parsedData = JSON.parse(data.toString());   
  console.log(parsedData);

};

module.exports = {
  sendDataToClient,
  handleIncomingSocketData
}
