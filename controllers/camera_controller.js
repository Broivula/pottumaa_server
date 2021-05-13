'use strict'

const upload_pic = require('./fs_controller.js').upload;

const post_picture = (req, res) => {
  try{
    console.log('picture saved successfully.')
    res.status(200).send({msg: "success!"});
  }catch(err){
    console.log('pic posting failed!');
  };
}
/*
app.post('/post/picture', upload.single('image'), (req, res, next) => {

    //handle the pic data
    console.log("new image posted succesfully");
    res.json({message:'Upload successful'})
});
*/
const get_picture = async (req, res) => {
  try{
    console.log('getting a picture!');
  }catch(err){
    console.log('error getting a picture');
  }
}


module.exports = {
  post_picture,
  get_picture,
}
