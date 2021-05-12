'use strict'

const create_token = require('../security/authenticator.js').create_token;

const accepted_connection = async (req, res) => {
  try{
    const auth_sec_2 = req.body.auth_sec_2;
    if (auth_sec_2 == process.env.AUTH_SEC_2)
    {
      const token = await create_token(req.headers['auth_p1']);
      res.status(200).send({token});
    }else{
      console.log('someone trying to authenticate without auth_sec_2');
      res.status(401).send();
    }
  }catch(err){
    console.log('error accepting a connection');
  }
}

module.exports = {
  accepted_connection,
}
