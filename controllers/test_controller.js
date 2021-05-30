'use strict'

const s_c = require('./socket_controller.js').sendDataToClient;

const test_data_sending = () => {
  s_c(1, "take a pic, yo!")
}


module.exports = {
  test_data_sending
}
