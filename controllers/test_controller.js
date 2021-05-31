'use strict'

const s_c = require('./socket_controller.js').sendDataToClient;

const test_data_sending = async (req, res) => {
  console.log('starting to send data to camera - take pic!');
  s_c(1, "disco_baby_yeaah_take_a_picture");
  res.writeHead(200).send();
}


module.exports = {
  test_data_sending
}
