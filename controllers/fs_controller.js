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

module.exports = {
  upload,
}
