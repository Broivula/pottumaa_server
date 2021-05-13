'use strict'
const fs = require('fs')

const post_picture = (req, res) => {
  try{
    console.log('picture saved successfully.')
    res.status(200).send({msg: "success!"});
  }catch(err){
    console.log('pic posting failed!');
  };
}

// exact pathing here to be modified..
const get_picture = async (req, res) => {
  try{
    const file_path = req.body.target_file;
    const full_path = __dirname + "/../uploads/potato_field/" + file_path;

    if(fs.existsSync(full_path)){
      res.setHeader('Content-Type', 'image/jpeg');
      res.sendFile(file_path, {root:__dirname+"/../uploads/potato_field/"})
    }else{
      console.log("no such file found.");
    }
    console.log('getting a picture!');
  }catch(err){
    console.log('error getting a picture');
  }
}


module.exports = {
  post_picture,
  get_picture,
}
