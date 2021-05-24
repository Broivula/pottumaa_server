'use strict'

const express = require('express');
const router = express.Router();
const image_controller = require('../controllers/image_controller.js');
const fs_controller = require('../controllers/fs_controller.js').upload;

router.route('/')
  .get(image_controller.get_image_paths)
  .post(fs_controller.single('image'),image_controller.post_picture)

router.route('/:path')
  .get(image_controller.get_single_picture)

module.exports = router;
