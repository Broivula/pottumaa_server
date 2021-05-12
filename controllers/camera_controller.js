'use strict'

const post_picture = async (req, res) => {
  try{
    console.log('posting a pic!');
  }catch(err){
    console.log('pic posting failed!');
  }
} 

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
