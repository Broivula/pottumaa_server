'use strict'

const express = require('express');
const router = express.Router();
const camera_controller = require('../controllers/camera_controller.js');
const fs_controller = require('../controllers/fs_controller.js').upload;

router.route('/')
  .get(camera_controller.get_picture)
  .post(fs_controller.single('image'),camera_controller.post_picture)

module.exports = router;
