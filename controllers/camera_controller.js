'use strict'
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination:  (req, file, cb) => {

        // so this is where we save the image data
        // first we need to check if a folder with the current date format already exists
	console.log(req.body.folder)
        if(!fs.existsSync(req.body.folder)){
            fs.mkdirSync(req.body.folder)
        }
        cb(null, req.body.folder)
    },

    filename: (req, file, cb) => {

        // now we name the incoming picture file of the potato field
        console.log(file.originalname);
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});

const post_picture = (upload.single('image'),  (req, res) => {
  try{
    res.status(200).send({msg: "success!"});
  }catch(err){
    console.log('pic posting failed!');
  };
})
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
