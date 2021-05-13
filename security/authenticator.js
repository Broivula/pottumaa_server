'use strict'
require ('dotenv').config();
const jwt = require('jsonwebtoken');

const create_token = async (secret) => {
  const token = await new Promise((resolve, reject) => {
    resolve(jwt.sign(secret, process.env.SAT))
  });

  return token;
}

const authenticate = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];
  if(token == null || req.headers["auth_sec_2"] != process.env.AUTH_SEC_2){
    console.log('unauthorized attempt');
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.SAT, (err) => {
  if(err) return res.sendStatus(403);
    console.log("all verified, proceeding..")
    next();
  })
}

module.exports = {
  authenticate, 
  create_token,
}
