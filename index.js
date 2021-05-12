'use strict';
require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
//const mysql = require('mysql');
const bodyParser = require('body-parser');
const fs = require('fs');
const spawn = require('child_process').spawn;
const multer = require('multer');
const authenticator = require('./security/authenticator.js').authenticate;
const PORT = process.env.PORT;

const image_route = require('./routes/image_router.js');
const auth_route = require('./routes/sec_router.js');

// configure parsing
app.use(express.json({strict:true}));
app.use(express.urlencoded({extended: false}));


// configure routing

app.use('/image', authenticator, image_route);
app.use('/auth_pipeline', auth_route);

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT} ...`);
})

