
/*
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB
});

const ip_data = {
   ip: process.env.IP
};
*/


app.use(function(req, res, next)
{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    next();
});


db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('mysql connected..');
});


app.get('/get/history/images/:dest', (req, res) =>{
    let date= new Date();
    let month = (date.getUTCMonth()+1) <10 ? '0'+ (date.getUTCMonth()+1) : date.getUTCMonth()+1;
    let day = date.getUTCDate() < 10 ? '0'+ date.getUTCDate() : date.getUTCDate();
    let year = date.getUTCFullYear();
    let fulldate = year + '-' + month + '-' + day +'/';

    res.sendFile(req.params.dest, {root:__dirname + "/uploads/" + fulldate});
});


app.get('/get/potatoImages', (req, res) => {
    var folderPath = 'uploads/potato_field/';
    let imagePaths =[];
    var promises = [];
    var tempArr =[];
    var search = (path) => {
        if(path){
            return new Promise((resolve, reject) => {
                fs.readdir(folderPath + path + '/',(err, files) => {
                    resolve(files)
                })
            })

        }else{
            return new Promise((resolve, reject)=> {
                fs.readdir(folderPath, (err, folders) => {
                    resolve(folders)
                })
            })
        }

    };

    search().then((results) => {
        for(let path of results){
	//console.log(results)
            promises.push(new Promise((resolve, reject)=> {
                search(path).then((files) =>{
		let dataObj = {};
		dataObj["date"] = path;
		dataObj["images"] = files;
		//console.log(dataObj);
		imagePaths.push(dataObj)
		resolve()})
            }))
        }
        Promise.all(promises).then(() => {
          //  console.log(imagePaths);
            res.json(imagePaths)
        })
    })


});

// might want to have another look at this later on
app.get('/get/potatoImages/timelapse', (req, res)=>{
    res.sendFile({root:__dirname + "/uploads/timelapse.gif"})
})

app.get('/get/potatoImages/:dest', (req, res) => {
   // console.log('getting an image-');
    var file_path = req.params.dest.replace(/!/g, "/");
    res.sendFile(file_path,  {root:__dirname + "/uploads/potato_field/"});
});




//just a function to keep the db connection up
setInterval(() =>{
    db.query('SELECT * FROM prices', (err, result) =>{
        if(err) throw err;
        //console.log('just keeping up the connection to the database..')
    })
}, 100000);

