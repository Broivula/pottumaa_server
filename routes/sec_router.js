'use strict'

const express = require('express');
const router = express.Router();
const sec_controller = require('../controllers/sec_controller.js');

router.route('/')
  .get(sec_controller.accepted_connection)

module.exports = router;
