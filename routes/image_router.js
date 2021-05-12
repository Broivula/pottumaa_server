'use strict'

const express = require('express');
const router = express.Router();
const camera_controller = require('../controllers/camera_controller.js');

router.route('/')
  .get(camera_controller.get_picture)
  .post(camera_controller.post_picture)

module.exports = router;
