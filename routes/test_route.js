'use strict'

const express = require('express');
const router = express.Router();
const test_controller = require('../controllers/test_controller.js');

router.route('/')
  .get(test_controller.test_data_sending)

module.exports = router;


