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
const get_single_picture = async (req, res) => {
  try{
    const file_path = req.params.path;
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

const get_image_paths = async (req, res) => {
  try{
      var folderPath = 'uploads/potato_field/';
      let imagePaths =[];
      var promises = [];
      var tempArr =[];
      var search = (path) => {
        if(path){
          return new Promise((resolve, reject) => {
            fs.readdir(folderPath + path + '/',(err, files) => {
              resolve(files)})
              })
        }else{
          return new Promise((resolve, reject)=> {
            fs.readdir(folderPath, (err, folders) => {
              resolve(folders)})
              })
          }
      };
 
      search().then((results) => {
        for(let path of results){
          promises.push(new Promise((resolve, reject)=> {
            search(path).then((files) =>{
              let dataObj = {};
              dataObj["date"] = path;
              dataObj["images"] = files;
              imagePaths.push(dataObj)
              resolve()})
          }))
        }
        Promise.all(promises).then(() => {
          res.json(imagePaths)
        })
      })
  }catch(err){
    console.log('error retrieving image paths');
  }
}


module.exports = {
  post_picture,
  get_single_picture,
  get_image_paths
}
